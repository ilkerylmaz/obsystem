package com.ilker.obsystem.dto.response;

import com.ilker.obsystem.enums.NoteListStatus;

import java.math.BigDecimal;

public record StudentNoteDTO(
        Long id,
        String lessonName,
        String courseCode,
        Long midtermNote,
        Long finalNote,
        Long makeupExam,
        Long average,
        NoteListStatus status,
        Long absenteeismCount,
        String grade
) {
}
