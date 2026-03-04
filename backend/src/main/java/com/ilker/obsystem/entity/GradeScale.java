package com.ilker.obsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "grade_scale")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GradeScale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,nullable = false)
    private String letter;

    @Column(name = "min_score", precision = 5, scale = 2,nullable = false)
    private BigDecimal minScore;

    @Column(name = "max_score", precision = 5, scale = 2,nullable = false)
    private BigDecimal maxScore;

    @Column(name = "gpa_point", precision = 3, scale = 2,nullable = false)
    private BigDecimal gpaPoint;

    private boolean isPassing;

}
