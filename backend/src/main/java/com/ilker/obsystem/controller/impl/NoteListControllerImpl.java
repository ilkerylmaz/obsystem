package com.ilker.obsystem.controller.impl;

import com.ilker.obsystem.controller.NoteListController;
import com.ilker.obsystem.dto.response.SemesterNoteDTO;
import com.ilker.obsystem.dto.response.StudentNoteDTO;
import com.ilker.obsystem.service.NoteListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class NoteListControllerImpl implements NoteListController {

    private final NoteListService noteListService;

    @Override
    @GetMapping(path = "student/{studentId}/notes")
    public List<SemesterNoteDTO> getStudentNotes(@PathVariable Long studentId) {
        return noteListService.getStudentNotes(studentId);
    }
}
