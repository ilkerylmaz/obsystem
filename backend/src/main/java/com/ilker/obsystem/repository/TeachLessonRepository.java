package com.ilker.obsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ilker.obsystem.entity.TeacherLesson;

public interface TeachLessonRepository extends JpaRepository<TeacherLesson, Long> {
	boolean existsByLesson_CourseCode(String courseCode);
	List<TeacherLesson> findByLesson_Id(Long lessonId);
	List<TeacherLesson> findByTeacherIdAndIsActiveTrue(Long teacherId);
}
