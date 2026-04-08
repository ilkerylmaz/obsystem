package com.ilker.obsystem.dto.response;

import java.math.BigDecimal;

public record StudentGpaDTO(
    Long studentId,
    String studentNo,
    String fullName,
    Integer totalCourses,
    Integer totalCredits,
    BigDecimal weightedSum,
    BigDecimal gpa,
    Long semesterId,
    String semesterName
) {}
