package com.ilker.obsystem.entity;

import com.ilker.obsystem.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollment_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id",nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacher_lesson_id",nullable = false)
    private TeacherLesson teacherLesson;

    @ManyToOne
    @JoinColumn(name = "semester_id",nullable = false)
    private Semester semester;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    @ManyToOne
    @JoinColumn(name = "reviewed_by")
    private Teacher reviewedBy;

    @Column(name = "review_note",columnDefinition = "TEXT")
    private String reviewNote;

    @Column(name = "requested_at", updatable = false)
    private LocalDateTime requestedAt = LocalDateTime.now();

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
}
