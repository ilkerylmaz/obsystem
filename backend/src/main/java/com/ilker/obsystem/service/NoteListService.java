package com.ilker.obsystem.service;

import com.ilker.obsystem.dto.response.SemesterNoteDTO;

import java.util.List;

public interface NoteListService {
    public List<SemesterNoteDTO> getStudentNotes(Long studentId);
}
