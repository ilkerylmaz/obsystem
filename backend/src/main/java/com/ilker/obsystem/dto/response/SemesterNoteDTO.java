package com.ilker.obsystem.dto.response;


import lombok.Data;

import java.util.List;


public record SemesterNoteDTO(
      String semesterName,
      List<StudentNoteDTO> notes
) {
}
