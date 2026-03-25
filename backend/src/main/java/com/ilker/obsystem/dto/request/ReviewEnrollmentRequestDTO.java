package com.ilker.obsystem.dto.request;

import com.ilker.obsystem.enums.RequestStatus;

import jakarta.validation.constraints.NotNull;

public record ReviewEnrollmentRequestDTO(
        @NotNull(message = "status zorunludur") RequestStatus status,
        String reviewNote
) {
}
