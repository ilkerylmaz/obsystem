package com.ilker.obsystem.dto.request;

public record AddStudentDTO(
        String studentNo,
        Long advisorId,
        String telephone,
        Long departmentId
) {
}
