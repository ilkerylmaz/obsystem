package com.ilker.obsystem.dto.request;

import java.math.BigDecimal;
import java.util.List;

public record TeacherGradeUpdateDTO(
        Long noteListId,
        BigDecimal midtermNote,
        BigDecimal finalNote,
        BigDecimal makeupExam
) {}