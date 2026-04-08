package com.ilker.obsystem.service.impl;

import com.ilker.obsystem.dto.response.SemesterNoteDTO;
import com.ilker.obsystem.dto.response.StudentNoteDTO;
import com.ilker.obsystem.entity.NoteList;
import com.ilker.obsystem.mapper.NoteListMapper;
import com.ilker.obsystem.repository.NoteListRepository;
import com.ilker.obsystem.service.NoteListService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteListServiceImpl implements NoteListService {

    private final NoteListRepository noteListRepository;
    private final NoteListMapper noteListMapper;

    @Override
    @Transactional
    public List<SemesterNoteDTO> getStudentNotes(Long studentId) {
        List<NoteList> notes = noteListRepository.findByStudentId(studentId);
        return notes.stream()
                .collect(Collectors.groupingBy(
                        n -> n.getTeacherLesson().getSemester().getSemesterName()
                ))
                .entrySet()
                .stream()
                .map(entry -> new SemesterNoteDTO(
                        entry.getKey(),
                        entry.getValue().stream()
                                .map(noteListMapper::toDto).toList()
                ))
                .toList();

    }
}
