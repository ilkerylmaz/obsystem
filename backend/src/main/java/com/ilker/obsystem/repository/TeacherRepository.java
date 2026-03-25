package com.ilker.obsystem.repository;

import com.ilker.obsystem.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> getTeacherInfoById(Long teacherId);
}
