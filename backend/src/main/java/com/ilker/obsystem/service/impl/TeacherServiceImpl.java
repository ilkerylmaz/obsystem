package com.ilker.obsystem.service.impl;

import com.ilker.obsystem.dto.response.TeacherDashboardCourseDTO;
import com.ilker.obsystem.dto.response.TeacherDashboardStatsDTO;
import com.ilker.obsystem.dto.response.TeacherInfDTO;
import com.ilker.obsystem.dto.response.TeacherStudentGradeDTO;
import com.ilker.obsystem.dto.request.TeacherGradeUpdateDTO;
import com.ilker.obsystem.entity.NoteList;
import com.ilker.obsystem.entity.Student;
import com.ilker.obsystem.entity.Teacher;
import com.ilker.obsystem.entity.TeacherLesson;
import com.ilker.obsystem.mapper.TeacherMapper;
import com.ilker.obsystem.repository.NoteListRepository;
import com.ilker.obsystem.repository.TeachLessonRepository;
import com.ilker.obsystem.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.ilker.obsystem.repository.TeacherRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final TeachLessonRepository teachLessonRepository;
    private final NoteListRepository noteListRepository;
    private final TeacherMapper teacherMapper;

    @Override
    public TeacherInfDTO getTeacherInfoById(Long teacherId) {
        Teacher teacher = teacherRepository.getTeacherInfoById(teacherId)
                .orElseThrow(() -> new RuntimeException("run time Error"));
        return teacherMapper.toTeacherInfDTO(teacher);
    }

    @Override
    public TeacherDashboardStatsDTO getTeacherDashboardStats(Long teacherId) {
        List<TeacherLesson> activeLessons = teachLessonRepository.findByTeacherIdAndIsActiveTrue(teacherId);
        List<TeacherDashboardCourseDTO> courseDTOs = new ArrayList<>();
        long totalStudents = 0L;

        for (TeacherLesson tl : activeLessons) {
            Long studentCount = noteListRepository.countByTeacherLessonId(tl.getId());
            totalStudents += studentCount;
            
            TeacherDashboardCourseDTO courseDTO = new TeacherDashboardCourseDTO(
                    tl.getId(),
                    tl.getLesson().getCourseCode(),
                    tl.getLesson().getLessonName(),
                    tl.getSemester().getSemesterName(),
                    tl.getQuota(),
                    studentCount
            );
            courseDTOs.add(courseDTO);
        }

        return new TeacherDashboardStatsDTO((long) activeLessons.size(), totalStudents, courseDTOs);
    }

    @Override
    public List<TeacherStudentGradeDTO> getStudentsByTeacherLesson(Long teacherLessonId) {
        List<NoteList> notes = noteListRepository.findByTeacherLessonId(teacherLessonId);
        List<TeacherStudentGradeDTO> dtos = new ArrayList<>();
        for (NoteList nl : notes) {
            Student s = nl.getStudent();
            dtos.add(new TeacherStudentGradeDTO(
                    nl.getId(),
                    s.getId(),
                    s.getStudentNo(),
                    s.getFullName(),
                    nl.getMidtermNote(),
                    nl.getFinalNote(),
                    nl.getMakeupExam()
            ));
        }
        return dtos;
    }

    @Override
    public void updateGrades(List<TeacherGradeUpdateDTO> request) {
        for (TeacherGradeUpdateDTO dto : request) {
            NoteList nl = noteListRepository.findById(dto.noteListId())
                    .orElseThrow(() -> new RuntimeException("NoteList not found for id: " + dto.noteListId()));
            nl.setMidtermNote(dto.midtermNote());
            nl.setFinalNote(dto.finalNote());
            nl.setMakeupExam(dto.makeupExam());
            noteListRepository.save(nl); // Average will be recalculated via trigger or before save if written. 
        }
    }
}
