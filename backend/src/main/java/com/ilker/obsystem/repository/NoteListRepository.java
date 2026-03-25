package com.ilker.obsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ilker.obsystem.entity.NoteList;

public interface NoteListRepository extends JpaRepository<NoteList, Long> {
    List<NoteList> findByStudentId(Long studentId);

    boolean existsByStudentIdAndTeacherLessonId(Long studentId, Long teacherLessonId);
}
