package com.ilker.obsystem.service;

import java.util.List;

import com.ilker.obsystem.dto.request.CreateEnrollmentRequestDTO;
import com.ilker.obsystem.dto.request.ReviewEnrollmentRequestDTO;
import com.ilker.obsystem.dto.response.EnrollmentRequestResponseDTO;

public interface EnrollmentRequestService {

    EnrollmentRequestResponseDTO createRequest(Long studentId, CreateEnrollmentRequestDTO requestDTO);

    List<EnrollmentRequestResponseDTO> listStudentRequests(Long studentId);

    List<EnrollmentRequestResponseDTO> listAdvisorPendingRequests(Long advisorId);

    EnrollmentRequestResponseDTO reviewRequest(Long advisorId, Long requestId, ReviewEnrollmentRequestDTO requestDTO);
}
