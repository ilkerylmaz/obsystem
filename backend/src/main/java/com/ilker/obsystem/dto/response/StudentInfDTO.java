package com.ilker.obsystem.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;


public record StudentInfDTO(
        String studentNo,
        String advisorFullName,
        String email,
        String fullName,
        String telephone,
        String departmentName,
        Integer enrollmentYear,
        Short classYear,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDateTime createdAt
) {
}
