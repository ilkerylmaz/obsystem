package com.ilker.obsystem.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ilker.obsystem.dto.response.LessonsDTO;
import com.ilker.obsystem.entity.TeacherLesson;

@Mapper(componentModel = "spring")
public interface TeachLessonMapper {
    //öğretmen ismi ile birlikte dersleri listeleme
    @Mapping(source = "lesson.courseCode", target = "courseCode")
    @Mapping(source = "lesson.lessonName", target = "lessonName")
    @Mapping(source = "lesson.credit", target = "credit")
    @Mapping(source = "lesson.ects", target = "ects")
    @Mapping(source = "lesson.lessonType", target = "lessonType")
    @Mapping(source = "lesson.department.id", target = "departmentId")
    @Mapping(source = "teacher.fullName", target = "teacherFullName")
    @Mapping(source = "semester.semesterName", target = "semesterName")
    LessonsDTO toDto(TeacherLesson teacherLesson);

    List<LessonsDTO> toDtoList(List<TeacherLesson> teacherLessons);
}
