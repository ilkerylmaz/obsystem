package com.ilker.obsystem.repository;

import com.ilker.obsystem.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    boolean existsByCourseCode(String courseCode);
}
