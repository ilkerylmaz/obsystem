package com.ilker.obsystem.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ilker.obsystem.dto.response.LessonsDTO;
import com.ilker.obsystem.entity.TeacherLesson;
import com.ilker.obsystem.mapper.TeachLessonMapper;
import com.ilker.obsystem.repository.TeachLessonRepository;
import com.ilker.obsystem.service.TeachLessonService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeachLessonServiceImpl implements TeachLessonService {

    private final TeachLessonRepository teachLessonRepository;
    private final TeachLessonMapper teachLessonMapper;

    @Override
    public List<LessonsDTO> listLessons(Long studentId) {
        List<TeacherLesson> lessons = teachLessonRepository.findAll();
        return lessons.stream()
                .map(teachLessonMapper::toDto)
                .toList();
    }
}
