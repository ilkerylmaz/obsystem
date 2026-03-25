package com.ilker.obsystem.dto.response;

public record TeacherInfDTO(
        String fullName,
        String title,
        String email,
        String createdAt,
        String departmentName,
        String facultyName
) {
}
