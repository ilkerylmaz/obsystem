package com.ilker.obsystem.controller.impl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ilker.obsystem.controller.EnrollmentRequestController;
import com.ilker.obsystem.dto.request.CreateEnrollmentRequestDTO;
import com.ilker.obsystem.dto.request.ReviewEnrollmentRequestDTO;
import com.ilker.obsystem.dto.response.AvailableCourseDTO;
import com.ilker.obsystem.dto.response.EnrollmentRequestResponseDTO;
import com.ilker.obsystem.service.EnrollmentRequestService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentRequestControllerImpl implements EnrollmentRequestController {

    private final EnrollmentRequestService enrollmentRequestService;

    @Override
    @GetMapping("/student/{studentId}/available-courses")
    public List<AvailableCourseDTO> listAvailableCourses(@PathVariable Long studentId) {
        return enrollmentRequestService.listAvailableCourses(studentId);
    }

    @Override
    @PostMapping("/student/{studentId}/request")
    @ResponseStatus(HttpStatus.CREATED)
    public EnrollmentRequestResponseDTO createRequest(
            @PathVariable Long studentId,
            @RequestBody @Valid CreateEnrollmentRequestDTO requestDTO
    ) {
        return enrollmentRequestService.createRequest(studentId, requestDTO);
    }

    @Override
    @GetMapping("/student/{studentId}")
    public List<EnrollmentRequestResponseDTO> listStudentRequests(@PathVariable Long studentId) {
        return enrollmentRequestService.listStudentRequests(studentId);
    }

    @Override
    @GetMapping("/advisor/{advisorId}/pending")
    public List<EnrollmentRequestResponseDTO> listAdvisorPendingRequests(@PathVariable Long advisorId) {
        return enrollmentRequestService.listAdvisorPendingRequests(advisorId);
    }

    @Override
    @PutMapping("/advisor/{advisorId}/request/{requestId}/review")
    public EnrollmentRequestResponseDTO reviewRequest(
            @PathVariable Long advisorId,
            @PathVariable Long requestId,
            @RequestBody @Valid ReviewEnrollmentRequestDTO requestDTO
    ) {
        return enrollmentRequestService.reviewRequest(advisorId, requestId, requestDTO);
    }
}
