package com.ilker.obsystem.controller;

import com.ilker.obsystem.dto.response.LessonsDTO;

import java.util.List;

public interface TeachLessonController {
    public List<LessonsDTO> listLessons(Long studentId);

}
