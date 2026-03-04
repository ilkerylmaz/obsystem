package com.ilker.obsystem.repository;

import com.ilker.obsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    public List<Student> getStudentInfoById(Long studentId);
}
