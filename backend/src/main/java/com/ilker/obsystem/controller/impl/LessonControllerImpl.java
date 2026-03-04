package com.ilker.obsystem.controller.impl;

import com.ilker.obsystem.controller.LessonController;
import com.ilker.obsystem.dto.request.LessonCreateRequestDTO;
import com.ilker.obsystem.dto.request.LessonUpdateRequestDTO;
import com.ilker.obsystem.dto.response.LessonsDTO;
import com.ilker.obsystem.service.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class LessonControllerImpl implements LessonController {

    private final LessonService lessonService;

    @Override
    @PostMapping(path = "/lesson/create")
    public void addLessonToStudent(@RequestBody LessonCreateRequestDTO createLessonDto) {
        lessonService.addLessonToStudent(createLessonDto);
    }

    @Override
    @PutMapping(path = "/lesson/update")
    public ResponseEntity<String> updateLesson(@RequestBody @Valid LessonUpdateRequestDTO updateLessonDto) {
        lessonService.updateLesson(updateLessonDto);
        return ResponseEntity.ok("ders başarılı bir şekilde güncellendi.");
    }

    @Override
    @GetMapping(path = "/lesson/list")
    public List<LessonsDTO> listLessons() {
        return lessonService.listLessons();
    }


}
