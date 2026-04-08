package com.ilker.obsystem.controller.impl;

import com.ilker.obsystem.controller.TeacherController;
import com.ilker.obsystem.dto.response.TeacherDashboardStatsDTO;
import com.ilker.obsystem.dto.response.TeacherInfDTO;
import com.ilker.obsystem.dto.response.TeacherStudentGradeDTO;
import com.ilker.obsystem.dto.request.TeacherGradeUpdateDTO;
import com.ilker.obsystem.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TeacherControllerImpl implements TeacherController {
    private final TeacherService teacherService;

    @Override
    @GetMapping("/teacher/info/{teacherId}")
    public TeacherInfDTO getTeacherInfoById(@PathVariable Long teacherId) {
        return teacherService.getTeacherInfoById(teacherId);
    }

    @Override
    @GetMapping("/teacher/dashboard/{teacherId}")
    public TeacherDashboardStatsDTO getTeacherDashboardStats(@PathVariable Long teacherId) {
        return teacherService.getTeacherDashboardStats(teacherId);
    }

    @Override
    @GetMapping("/teacher/lessons/{teacherLessonId}/students")
    public List<TeacherStudentGradeDTO> getStudentsByTeacherLesson(@PathVariable Long teacherLessonId) {
        return teacherService.getStudentsByTeacherLesson(teacherLessonId);
    }

    @Override
    @PutMapping("/teacher/grades/update")
    public void updateGrades(@RequestBody List<TeacherGradeUpdateDTO> request) {
        teacherService.updateGrades(request);
    }
}
