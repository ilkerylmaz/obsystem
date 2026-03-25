package com.ilker.obsystem.dto.response;

import com.ilker.obsystem.enums.LessonType;

public record LessonsDTO(
        String courseCode,
        String lessonName,
        Short credit,
        Short ects,
        Long departmentId,
        String semesterName,
        LessonType lessonType,
        String teacherFullName
) {
}
