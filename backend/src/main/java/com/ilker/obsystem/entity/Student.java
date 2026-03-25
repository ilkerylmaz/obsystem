package com.ilker.obsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;

import java.sql.Types;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;


    @Column(unique = true, nullable = false, name = "student_no")
    private String studentNo;

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    private Teacher advisor;

    @Column(name = "fullname", nullable = false, length = 50)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String telephone;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(nullable = false,name = "enrollment_year")
    private Integer enrollmentYear;

    @Column(name = "class_year", nullable = false)
    private Short classYear;

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
