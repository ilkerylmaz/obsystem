package com.ilker.obsystem.controller.impl;

import com.ilker.obsystem.controller.TeachLessonController;
import com.ilker.obsystem.dto.response.LessonsDTO;
import com.ilker.obsystem.service.TeachLessonService;
import com.ilker.obsystem.service.impl.TeachLessonServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TeachLessonControllerImpl implements TeachLessonController {
    private final TeachLessonServiceImpl teachLessonService;


    @Override
    @GetMapping(path = "/student/{studentId}/lessons")
    public List<LessonsDTO> listLessons(@PathVariable Long studentId) {
        return teachLessonService.listLessons(studentId);
    }
}
