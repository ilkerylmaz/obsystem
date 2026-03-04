package com.ilker.obsystem.service;

import com.ilker.obsystem.dto.response.StudentCourseDTO;
import com.ilker.obsystem.dto.response.StudentInfDTO;


import java.util.List;

public interface StudentService {
    public List<StudentCourseDTO> findLessonsByStudent(Long studentId);
    public List<StudentInfDTO> getAllStudentInf(Long studentId);
}
