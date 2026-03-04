package com.ilker.obsystem.service;

import com.ilker.obsystem.dto.request.LessonCreateRequestDTO;
import com.ilker.obsystem.dto.request.LessonUpdateRequestDTO;
import com.ilker.obsystem.dto.response.LessonsDTO;

import java.util.List;

public interface LessonService {
    public void addLessonToStudent(LessonCreateRequestDTO createLessonDto);
    public void updateLesson(LessonUpdateRequestDTO updateLessonDto);
    public List<LessonsDTO> listLessons();

}
