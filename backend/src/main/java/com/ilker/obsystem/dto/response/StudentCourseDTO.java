package com.ilker.obsystem.dto.response;

import java.math.BigDecimal;

public record StudentCourseDTO(
        String courseCode,
        String courseName,
        String semesterName,
        BigDecimal midtermNote,
        BigDecimal finalNote,
        BigDecimal average,
        String letterGrade

) {
}
