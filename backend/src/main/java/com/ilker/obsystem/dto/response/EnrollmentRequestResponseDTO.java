package com.ilker.obsystem.dto.response;

import com.ilker.obsystem.enums.RequestStatus;

import java.time.LocalDateTime;

public record EnrollmentRequestResponseDTO(
        Long requestId,
        Long studentId,
        String studentNo,
        Long teacherLessonId,
        String courseCode,
        String lessonName,
        Long credit,
        Long ects,
        String semesterName,
        String teacherFullName,
        RequestStatus status,
        String requestNote,
        String reviewNote,
        Long reviewedById,
        String reviewedByFullName,
        LocalDateTime requestedAt,
        LocalDateTime reviewedAt
) {
}
