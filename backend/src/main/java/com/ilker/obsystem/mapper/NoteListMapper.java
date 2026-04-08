package com.ilker.obsystem.mapper;

import com.ilker.obsystem.dto.response.LessonsDTO;
import com.ilker.obsystem.dto.response.SemesterNoteDTO;
import com.ilker.obsystem.dto.response.StudentNoteDTO;
import com.ilker.obsystem.entity.NoteList;
import com.ilker.obsystem.entity.TeacherLesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NoteListMapper {
    @Mapping(source = "teacherLesson.lesson.courseCode", target = "courseCode")
    @Mapping(source = "teacherLesson.lesson.lessonName", target = "lessonName")
    StudentNoteDTO toDto(NoteList noteList);
}
