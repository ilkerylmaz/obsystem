package com.ilker.obsystem.service;

import com.ilker.obsystem.dto.response.TeacherDashboardStatsDTO;
import com.ilker.obsystem.dto.response.TeacherInfDTO;
import com.ilker.obsystem.dto.response.TeacherStudentGradeDTO;
import com.ilker.obsystem.dto.request.TeacherGradeUpdateDTO;

import java.util.List;
import java.util.Optional;

public interface TeacherService {
    public TeacherInfDTO getTeacherInfoById(Long teacherId);
    public TeacherDashboardStatsDTO getTeacherDashboardStats(Long teacherId);
    List<TeacherStudentGradeDTO> getStudentsByTeacherLesson(Long teacherLessonId);
    void updateGrades(List<TeacherGradeUpdateDTO> request);
}
