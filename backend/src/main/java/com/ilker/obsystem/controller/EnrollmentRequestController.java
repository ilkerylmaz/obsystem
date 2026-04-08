package com.ilker.obsystem.controller;

import java.util.List;

import com.ilker.obsystem.dto.request.CreateEnrollmentRequestDTO;
import com.ilker.obsystem.dto.request.ReviewEnrollmentRequestDTO;
import com.ilker.obsystem.dto.response.AvailableCourseDTO;
import com.ilker.obsystem.dto.response.EnrollmentRequestResponseDTO;

public interface EnrollmentRequestController {

    List<AvailableCourseDTO> listAvailableCourses(Long studentId);

    EnrollmentRequestResponseDTO createRequest(Long studentId, CreateEnrollmentRequestDTO requestDTO);

    List<EnrollmentRequestResponseDTO> listStudentRequests(Long studentId);

    List<EnrollmentRequestResponseDTO> listAdvisorPendingRequests(Long advisorId);

    EnrollmentRequestResponseDTO reviewRequest(Long advisorId, Long requestId, ReviewEnrollmentRequestDTO requestDTO);
}
