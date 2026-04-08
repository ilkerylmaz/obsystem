package com.ilker.obsystem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "vw_student_gpa")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class StudentGpa {

    @Id
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "student_no")
    private String studentNo;

    @Column(name = "fullname")
    private String fullName;

    @Column(name = "total_courses")
    private Integer totalCourses;

    @Column(name = "total_credits")
    private Integer totalCredits;

    @Column(name = "weighted_sum")
    private BigDecimal weightedSum;

    @Column(name = "gpa")
    private BigDecimal gpa;

    @Column(name = "semester_id")
    private Long semesterId;

    @Column(name = "semester_name")
    private String semesterName;
}
