package com.ilker.obsystem.dto.response;

public record TeacherDashboardCourseDTO(
        Long teacherLessonId,
        String courseCode,
        String lessonName,
        String semesterName,
        Integer quota,
        Long enrolledStudentCount
) {}
