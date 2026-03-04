package com.ilker.obsystem.entity;

import com.ilker.obsystem.enums.NoteListStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "notelist")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id",nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacher_lesson_id",nullable = false)
    private TeacherLesson teacherLesson;

    @Column(name = "midterm_note", precision = 5, scale = 2)
    private BigDecimal midtermNote;

    @Column(name = "final_note", precision = 5, scale = 2)
    private BigDecimal finalNote;

    @Column(name = "makeup_exam", precision = 5, scale = 2)
    private BigDecimal makeupExam;

    @Column(precision = 5, scale = 2)
    private BigDecimal average;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NoteListStatus status;

    @ManyToOne
    @JoinColumn(name = "letter_grade", referencedColumnName = "letter")
    private GradeScale letterGrade;

    @Column(name = "absenteeism_count")
    private Integer absenteeismCount;

    //created_at ve updated_at kolonları
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }


}
