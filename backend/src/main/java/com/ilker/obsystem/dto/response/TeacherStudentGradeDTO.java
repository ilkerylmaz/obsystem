package com.ilker.obsystem.dto.response;

import java.math.BigDecimal;

public record TeacherStudentGradeDTO(
        Long noteListId,
        Long studentId,
        String studentNo,
        String fullName,
        BigDecimal midtermNote,
        BigDecimal finalNote,
        BigDecimal makeupExam
) {}