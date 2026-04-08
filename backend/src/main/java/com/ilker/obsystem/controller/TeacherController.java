package com.ilker.obsystem.controller;

import com.ilker.obsystem.dto.response.TeacherDashboardStatsDTO;
import com.ilker.obsystem.dto.response.TeacherInfDTO;
import com.ilker.obsystem.dto.response.TeacherStudentGradeDTO;
import com.ilker.obsystem.dto.request.TeacherGradeUpdateDTO;

import java.util.List;
import java.util.Optional;

public interface TeacherController {
    public TeacherInfDTO getTeacherInfoById(Long teacherId);
    public TeacherDashboardStatsDTO getTeacherDashboardStats(Long teacherId);
    public List<TeacherStudentGradeDTO> getStudentsByTeacherLesson(Long teacherLessonId);
    public void updateGrades(List<TeacherGradeUpdateDTO> request);
}
