package com.ilker.obsystem.repository;

import com.ilker.obsystem.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> getTeacherInfoById(Long teacherId);
}
