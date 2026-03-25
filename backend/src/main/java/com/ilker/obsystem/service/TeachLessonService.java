package com.ilker.obsystem.service;

import com.ilker.obsystem.dto.response.LessonsDTO;

import java.util.List;

public interface TeachLessonService {
    public List<LessonsDTO> listLessons(Long studentId);
}
