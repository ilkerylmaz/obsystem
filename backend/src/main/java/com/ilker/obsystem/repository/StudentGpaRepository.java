package com.ilker.obsystem.repository;

import com.ilker.obsystem.entity.StudentGpa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface StudentGpaRepository extends JpaRepository<StudentGpa, Long> {
    // A student might have multiple rows in the view depending on semester, 
    // or we might need an aggregate query. The view is currently grouped by student and semester.
    // So there could be multiple rows per student. For student's generic GPA over all semesters, 
    // the view currently returns GPA per semester. Let's recalculate overall GPA from the view or use the view with caution.

    List<StudentGpa> findByStudentId(Long studentId);
}
