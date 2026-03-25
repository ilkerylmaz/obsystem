package com.ilker.obsystem.dto.response;

import java.math.BigDecimal;

public record StudentCourseDTO(
        String courseCode,
        String lessonName,
        String semesterName,
        String departmentName,
        String teacherFullName,
        BigDecimal midtermNote,
        BigDecimal finalNote,
        BigDecimal average,
        String letterGrade,
        Short credit,
        Short ects

) {
}
