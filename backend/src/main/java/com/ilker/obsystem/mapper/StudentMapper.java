package com.ilker.obsystem.mapper;

import com.ilker.obsystem.dto.request.AddStudentDTO;
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
    @Mapping(source = "teacherLesson.lesson.lessonName", target = "lessonName")
    @Mapping(source = "letterGrade.letter", target = "letterGrade")
    @Mapping(source = "teacherLesson.semester.semesterName", target = "semesterName")
    @Mapping(source = "teacherLesson.teacher.fullName", target = "teacherFullName")
    @Mapping(source = "teacherLesson.teacher.department.name", target = "departmentName")
    @Mapping(source = "teacherLesson.lesson.credit", target = "credit")
    @Mapping(source = "teacherLesson.lesson.ects", target = "ects")
    StudentCourseDTO toCourseDto(NoteList noteList);
    //get student information mapping
    @Mapping(source = "department.name", target = "departmentName")
    @Mapping(source = "advisor.fullName", target = "advisorFullName")
    @Mapping(source = "user.email", target = "email")
    StudentInfDTO toStudentInfDto(Student student);

    //add student mapper
    @Mapping(target = "id", ignore = true)
    @Mapping(source = "departmentId", target = "department.id")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "enrollmentYear", ignore = true)
    @Mapping(target = "classYear", ignore = true)
    Student toAddStudentDto(AddStudentDTO addStudentDTO);


}
