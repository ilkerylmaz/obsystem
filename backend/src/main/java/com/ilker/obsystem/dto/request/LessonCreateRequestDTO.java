package com.ilker.obsystem.dto.request;

import com.ilker.obsystem.enums.LessonType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LessonCreateRequestDTO(
        @NotBlank(message = "ders kodu boş olamaz!" ) String courseCode,
        @NotBlank(message = "ders isimi boş olamaz!") String lessonName,
        @Min(value = 1, message = "kredi en az 1 olabilir!") int credit,
        @NotNull Short ects,
        @NotNull LessonType lessonType,
        @NotNull Long departmentId
        ) {
}
