package com.ilker.obsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ilker.obsystem.entity.NoteList;
import org.springframework.data.jpa.repository.Query;

public interface NoteListRepository extends JpaRepository<NoteList, Long> {
    List<NoteList> findByStudentId(Long studentId);

    boolean existsByStudentIdAndTeacherLessonId(Long studentId, Long teacherLessonId);

    //bu sorgu çok basic düzeyde öğrencinin aldığı derslerin sayısını verir ama öğrencinin o dersi önceden mi almış
    //yoksa halen alıyor mu diye kontrol etmiyor.
    @Query("SELECT COUNT(id) FROM NoteList id WHERE id.student.id = :studentId")
    Long getStudentLessonsCount (Long studentId);
}
