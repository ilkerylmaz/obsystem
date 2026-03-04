package com.ilker.obsystem.entity;

import com.ilker.obsystem.enums.TeacherRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "teacher_lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "teacher_id",nullable = false)
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "lesson_id",nullable = false)
    private Lesson lesson;

    @ManyToOne
    @JoinColumn(name = "semester_id",nullable = false)
    private Semester semester;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TeacherRole role;
    @Column
    private Integer quota;
    @Column(name = "is_active")
    private Boolean isActive;

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
