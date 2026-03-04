package com.ilker.obsystem.controller;

import com.ilker.obsystem.dto.response.StudentCourseDTO;
import com.ilker.obsystem.dto.response.StudentInfDTO;


import java.util.List;

public interface StudentController {

    public List<StudentCourseDTO> findLessonsByStudent(Long studentId);
    public List<StudentInfDTO> getAllStudentInf(Long studentId);

}
