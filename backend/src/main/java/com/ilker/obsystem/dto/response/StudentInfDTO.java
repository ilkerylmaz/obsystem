package com.ilker.obsystem.dto.response;

public record StudentInfDTO(
        String studentNo,
        String advisorFullName,
        String fullName,
        String telephone,
        String departmentName,
        Integer enrollmentYear,
        Short classYear
) {
}
