package com.ilker.obsystem.controller;

import com.ilker.obsystem.dto.request.AddStudentDTO;
import com.ilker.obsystem.dto.response.StudentCourseDTO;
import com.ilker.obsystem.dto.response.StudentGpaDTO;
import com.ilker.obsystem.dto.response.StudentInfDTO;


import java.util.List;

public interface StudentController {

    public List<StudentCourseDTO> findLessonsByStudent(Long studentId);
    public List<StudentInfDTO> getAllStudentInf(Long studentId);
    public void addStudent(AddStudentDTO addStudentDTO);
    public List<StudentGpaDTO> getStudentGpa(Long studentId);
}
