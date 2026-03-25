package com.ilker.obsystem.controller;

import com.ilker.obsystem.dto.request.LessonCreateRequestDTO;
import com.ilker.obsystem.dto.request.LessonUpdateRequestDTO;
import com.ilker.obsystem.dto.response.LessonsDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LessonController {
    public void addLessonToStudent(LessonCreateRequestDTO createLessonDto);
    public ResponseEntity<String> updateLesson(LessonUpdateRequestDTO updateLessonDto);
    public List<LessonsDTO> listLessons();
    public Long getLessonCount(Long studentId);
}
