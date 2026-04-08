package com.ilker.obsystem.service.impl;

import com.ilker.obsystem.dto.request.AddStudentDTO;
import com.ilker.obsystem.dto.response.StudentCourseDTO;
import com.ilker.obsystem.dto.response.StudentGpaDTO;
import com.ilker.obsystem.dto.response.StudentInfDTO;
import com.ilker.obsystem.entity.NoteList;
import com.ilker.obsystem.entity.Student;
import com.ilker.obsystem.entity.StudentGpa;
import com.ilker.obsystem.entity.User;
import com.ilker.obsystem.mapper.StudentMapper;
import com.ilker.obsystem.repository.LessonRepository;
import com.ilker.obsystem.repository.NoteListRepository;
import com.ilker.obsystem.repository.StudentGpaRepository;
import com.ilker.obsystem.repository.StudentRepository;
import com.ilker.obsystem.repository.UserRepository;
import com.ilker.obsystem.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    @Autowired
    private final StudentRepository studentRepository;
    private final NoteListRepository noteListRepository;
    private final UserRepository userRepository;
    private final StudentMapper studentMapper;
    private final StudentGpaRepository studentGpaRepository;

    @Override
    public List<StudentCourseDTO> findLessonsByStudent(Long studentId) {
        List<NoteList> notes = noteListRepository.findByStudentId(studentId);
        return notes.stream()
                .map(studentMapper::toCourseDto)
                .toList();
    }

    @Override
    public List<StudentInfDTO> getAllStudentInf(Long studentId) {
        List<Student> infos = studentRepository.getStudentInfoById(studentId);
        return infos.stream()
                .map(studentMapper::toStudentInfDto)
                .toList();
    }

    @Override
    public void addStudent(AddStudentDTO addStudentDTO) {
        if(studentRepository.existsByStudentNo(addStudentDTO.studentNo())){
            throw new RuntimeException("Hata: "+ addStudentDTO.studentNo() +" numaralı öğrenci zaten mevcut!");
        }

    }

    @Override
    public List<StudentGpaDTO> getStudentGpa(Long studentId) {
        List<StudentGpa> gpaList = studentGpaRepository.findByStudentId(studentId);
        return gpaList.stream()
                .map(g -> new StudentGpaDTO(
                        g.getStudentId(),
                        g.getStudentNo(),
                        g.getFullName(),
                        g.getTotalCourses(),
                        g.getTotalCredits(),
                        g.getWeightedSum(),
                        g.getGpa(),
                        g.getSemesterId(),
                        g.getSemesterName()
                ))
                .toList();
    }
}
