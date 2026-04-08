package com.ilker.obsystem.service.impl;

import com.ilker.obsystem.dto.request.CreateEnrollmentRequestDTO;
import com.ilker.obsystem.dto.request.ReviewEnrollmentRequestDTO;
import com.ilker.obsystem.dto.response.EnrollmentRequestResponseDTO;
import com.ilker.obsystem.dto.response.AvailableCourseDTO;
import com.ilker.obsystem.entity.EnrollmentRequest;
import com.ilker.obsystem.entity.NoteList;
import com.ilker.obsystem.entity.Student;
import com.ilker.obsystem.entity.TeacherLesson;
import com.ilker.obsystem.enums.NoteListStatus;
import com.ilker.obsystem.enums.RequestStatus;
import com.ilker.obsystem.mapper.EnrollmentRequestMapper;
import com.ilker.obsystem.repository.EnrollmentRequestRepository;
import com.ilker.obsystem.repository.NoteListRepository;
import com.ilker.obsystem.repository.StudentRepository;
import com.ilker.obsystem.repository.TeachLessonRepository;
import com.ilker.obsystem.service.EnrollmentRequestService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentRequestServiceImpl implements EnrollmentRequestService {

    private final EnrollmentRequestRepository enrollmentRequestRepository;
    private final StudentRepository studentRepository;
    private final TeachLessonRepository teachLessonRepository;
    private final NoteListRepository noteListRepository;
    private final EnrollmentRequestMapper enrollmentRequestMapper;

    @Override
    @Transactional
    public EnrollmentRequestResponseDTO createRequest(Long studentId, CreateEnrollmentRequestDTO requestDTO) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Öğrenci bulunamadı"));

        TeacherLesson teacherLesson = teachLessonRepository.findById(requestDTO.teacherLessonId())
                .orElseThrow(() -> new RuntimeException("Teacher lesson bulunamadı"));

        if (teacherLesson.getIsActive() == null || !teacherLesson.getIsActive()) {
            throw new RuntimeException("Bu ders ataması aktif değil");
        }

        boolean hasOpenRequest = enrollmentRequestRepository.existsByStudentIdAndTeacherLessonIdAndStatusIn(
                studentId,
                requestDTO.teacherLessonId(),
                Set.of(RequestStatus.PENDING, RequestStatus.APPROVED)
        );

        if (hasOpenRequest) {
            throw new RuntimeException("Bu ders için zaten açık/onarılmış talep mevcut");
        }

        EnrollmentRequest enrollmentRequest = new EnrollmentRequest();
        enrollmentRequest.setStudent(student);
        enrollmentRequest.setTeacherLesson(teacherLesson);
        enrollmentRequest.setSemester(teacherLesson.getSemester());
        enrollmentRequest.setStatus(RequestStatus.PENDING);
        enrollmentRequest.setRequestedAt(LocalDateTime.now());
        enrollmentRequest.setReviewNote(requestDTO.requestNote());

        EnrollmentRequest saved = enrollmentRequestRepository.save(enrollmentRequest);
        return enrollmentRequestMapper.toResponse(saved);
    }

    @Override
    public List<AvailableCourseDTO> listAvailableCourses(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Öğrenci bulunamadı"));

        // Only return courses from active semester where department matches
        // For simplicity, just finding all active teacher lessons and filtering.
        List<TeacherLesson> allLessons = teachLessonRepository.findAll();
        
        // Find existing enrollments
        Set<Long> takenLessonIds = noteListRepository.findByStudentId(studentId).stream()
                .map(note -> note.getTeacherLesson().getId())
                .collect(Collectors.toSet());

        // Find pending or approved requests
        Set<Long> requestedLessonIds = enrollmentRequestRepository.findByStudentIdOrderByRequestedAtDesc(studentId).stream()
                .filter(req -> req.getStatus() == RequestStatus.PENDING || req.getStatus() == RequestStatus.APPROVED)
                .map(req -> req.getTeacherLesson().getId())
                .collect(Collectors.toSet());

        return allLessons.stream()
                .filter(tl -> Boolean.TRUE.equals(tl.getIsActive()) && Boolean.TRUE.equals(tl.getSemester().getIsActive()))
                .filter(tl -> !takenLessonIds.contains(tl.getId()) && !requestedLessonIds.contains(tl.getId()))
                .filter(tl -> tl.getLesson().getDepartment() == null || tl.getLesson().getDepartment().getId().equals(student.getDepartment().getId()))
                .map(tl -> new AvailableCourseDTO(
                        tl.getId(),
                        tl.getLesson().getCourseCode(),
                        tl.getLesson().getLessonName(),
                        tl.getLesson().getCredit(),
                        tl.getLesson().getEcts(),
                        tl.getTeacher().getFullName(),
                        tl.getQuota(),
                        tl.getSemester().getSemesterName()
                ))
                .toList();
    }

    @Override
    public List<EnrollmentRequestResponseDTO> listStudentRequests(Long studentId) {
        return enrollmentRequestRepository.findByStudentIdOrderByRequestedAtDesc(studentId)
                .stream()
                .map(enrollmentRequestMapper::toResponse)
                .toList();
    }

    @Override
    public List<EnrollmentRequestResponseDTO> listAdvisorPendingRequests(Long advisorId) {
        return enrollmentRequestRepository
                .findByStatusAndStudentAdvisorIdOrderByRequestedAtAsc(RequestStatus.PENDING, advisorId)
                .stream()
                .map(enrollmentRequestMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public EnrollmentRequestResponseDTO reviewRequest(Long advisorId, Long requestId, ReviewEnrollmentRequestDTO requestDTO) {
        EnrollmentRequest enrollmentRequest = enrollmentRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Talep bulunamadı"));

        if (enrollmentRequest.getStatus() != RequestStatus.PENDING) {
            throw new RuntimeException("Sadece PENDING talepler review edilebilir");
        }

        if (enrollmentRequest.getStudent().getAdvisor() == null ||
                !enrollmentRequest.getStudent().getAdvisor().getId().equals(advisorId)) {
            throw new RuntimeException("Bu talebi sadece ilgili danışman inceleyebilir");
        }

        if (requestDTO.status() != RequestStatus.APPROVED && requestDTO.status() != RequestStatus.REJECTED) {
            throw new RuntimeException("Review işlemi yalnızca APPROVED veya REJECTED olabilir");
        }

        if (requestDTO.status() == RequestStatus.REJECTED &&
                (requestDTO.reviewNote() == null || requestDTO.reviewNote().isBlank())) {
            throw new RuntimeException("Reddedilen talepler için reviewNote zorunludur");
        }

        enrollmentRequest.setStatus(requestDTO.status());
        enrollmentRequest.setReviewedAt(LocalDateTime.now());
        enrollmentRequest.setReviewedBy(enrollmentRequest.getStudent().getAdvisor());
        enrollmentRequest.setReviewNote(requestDTO.reviewNote());

        if (requestDTO.status() == RequestStatus.APPROVED) {
            boolean exists = noteListRepository.existsByStudentIdAndTeacherLessonId(
                    enrollmentRequest.getStudent().getId(),
                    enrollmentRequest.getTeacherLesson().getId()
            );

            if (!exists) {
                NoteList noteList = new NoteList();
                noteList.setStudent(enrollmentRequest.getStudent());
                noteList.setTeacherLesson(enrollmentRequest.getTeacherLesson());
                noteList.setStatus(NoteListStatus.ACTIVE);
                noteList.setAbsenteeismCount(0);
                noteListRepository.save(noteList);
            }
        }

        EnrollmentRequest saved = enrollmentRequestRepository.save(enrollmentRequest);
        return enrollmentRequestMapper.toResponse(saved);
    }
}
