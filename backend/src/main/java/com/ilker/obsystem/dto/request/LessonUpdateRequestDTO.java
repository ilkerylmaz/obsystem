package com.ilker.obsystem.dto.request;

import com.ilker.obsystem.enums.LessonType;
import jakarta.validation.constraints.NotNull;

public record LessonUpdateRequestDTO(
        @NotNull Long id,
        String courseCode,
        String lessonName,
        Short credit,
        Short ects,
        Long departmentId,
        LessonType lessonType
) {
}
