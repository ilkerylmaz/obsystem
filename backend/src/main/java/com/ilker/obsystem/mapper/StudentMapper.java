package com.ilker.obsystem.mapper;

import com.ilker.obsystem.dto.response.StudentCourseDTO;
import com.ilker.obsystem.dto.response.StudentInfDTO;
import com.ilker.obsystem.entity.NoteList;
import com.ilker.obsystem.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring") //mapper'a spring kullandığımızı belirtiyoruz.
public interface StudentMapper {
    //list student courses mapping
    @Mapping(source = "teacherLesson.lesson.courseCode", target = "courseCode")
    @Mapping(source = "teacherLesson.lesson.lessonName", target = "courseName")
    @Mapping(source = "letterGrade.letter", target = "letterGrade")
    @Mapping(source = "teacherLesson.semester.semesterName", target = "semesterName")
    StudentCourseDTO toCourseDto(NoteList noteList);
    //get student information mapping
    @Mapping(source = "department.name", target = "departmentName")
    @Mapping(source = "advisor.fullName", target = "advisorFullName")
    StudentInfDTO toStudentInfDto(Student student);



}
