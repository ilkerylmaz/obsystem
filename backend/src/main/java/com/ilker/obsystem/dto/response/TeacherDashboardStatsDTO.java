package com.ilker.obsystem.dto.response;

import java.util.List;

public record TeacherDashboardStatsDTO(
        Long activeCourseCount,
        Long totalStudents,
        List<TeacherDashboardCourseDTO> courses
) {}
