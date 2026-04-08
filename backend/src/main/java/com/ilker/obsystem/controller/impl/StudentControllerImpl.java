package com.ilker.obsystem.controller.impl;

import com.ilker.obsystem.controller.StudentController;
import com.ilker.obsystem.dto.request.AddStudentDTO;
import com.ilker.obsystem.dto.response.StudentCourseDTO;
import com.ilker.obsystem.dto.response.StudentInfDTO;
import com.ilker.obsystem.service.impl.StudentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
@RequiredArgsConstructor
public class StudentControllerImpl implements StudentController {

    @Autowired
    private final StudentServiceImpl studentService;

    @Override
    @GetMapping(path = "/{studentId}/courses")
    public List<StudentCourseDTO> findLessonsByStudent(@PathVariable Long studentId) {
        return studentService.findLessonsByStudent(studentId);
    }

    @Override
    @GetMapping(path = "/{studentId}/info")
    public List<StudentInfDTO> getAllStudentInf(@PathVariable Long studentId) {
        return studentService.getAllStudentInf(studentId);
    }

    @Override
    @GetMapping(path = "/{studentId}/gpa")
    public List<com.ilker.obsystem.dto.response.StudentGpaDTO> getStudentGpa(@PathVariable Long studentId) {
        return studentService.getStudentGpa(studentId);
    }

    @Override
    @PostMapping(path = "/add")
    public void addStudent(@RequestBody AddStudentDTO addStudentDTO) {
        studentService.addStudent(addStudentDTO);
    }

}
