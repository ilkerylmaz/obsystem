package com.ilker.obsystem.dto.response;

public record AvailableCourseDTO(
    Long teacherLessonId,
    String courseCode,
    String lessonName,
    Short credit,
    Short ects,
    String teacherFullName,
    Integer quota,
    String semesterName
) {}