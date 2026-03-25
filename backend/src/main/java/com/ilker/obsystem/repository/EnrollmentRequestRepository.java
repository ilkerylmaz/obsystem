package com.ilker.obsystem.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ilker.obsystem.entity.EnrollmentRequest;
import com.ilker.obsystem.enums.RequestStatus;

public interface EnrollmentRequestRepository extends JpaRepository<EnrollmentRequest, Long> {

    boolean existsByStudentIdAndTeacherLessonIdAndStatusIn(
            Long studentId,
            Long teacherLessonId,
            Collection<RequestStatus> statuses
    );

    List<EnrollmentRequest> findByStudentIdOrderByRequestedAtDesc(Long studentId);

    List<EnrollmentRequest> findByStatusAndStudentAdvisorIdOrderByRequestedAtAsc(
            RequestStatus status,
            Long advisorId
    );
}
