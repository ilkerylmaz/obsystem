package com.ilker.obsystem.controller;

import com.ilker.obsystem.dto.response.SemesterNoteDTO;
import com.ilker.obsystem.dto.response.StudentNoteDTO;

import java.util.List;

public interface NoteListController {
    public List<SemesterNoteDTO> getStudentNotes(Long studentId);
}
