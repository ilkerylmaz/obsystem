package com.ilker.obsystem.dto.request;

import jakarta.validation.constraints.NotNull;

public record CreateEnrollmentRequestDTO(
        @NotNull(message = "teacherLessonId zorunludur")
        Long teacherLessonId,
        String requestNote
) {
}
