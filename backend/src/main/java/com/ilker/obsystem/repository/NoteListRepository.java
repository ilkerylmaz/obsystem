package com.ilker.obsystem.repository;

import com.ilker.obsystem.entity.NoteList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteListRepository extends JpaRepository<NoteList, Long> {
    List<NoteList> findByStudentId(Long studentId);
}
