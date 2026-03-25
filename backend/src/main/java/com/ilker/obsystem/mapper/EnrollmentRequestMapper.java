package com.ilker.obsystem.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ilker.obsystem.dto.response.EnrollmentRequestResponseDTO;
import com.ilker.obsystem.entity.EnrollmentRequest;

@Mapper(componentModel = "spring")
public interface EnrollmentRequestMapper {

    @Mapping(source = "id", target = "requestId")
    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.studentNo", target = "studentNo")
    @Mapping(source = "teacherLesson.id", target = "teacherLessonId")
    @Mapping(source = "teacherLesson.lesson.courseCode", target = "courseCode")
    @Mapping(source = "teacherLesson.lesson.lessonName", target = "lessonName")
    @Mapping(source = "teacherLesson.semester.semesterName", target = "semesterName")
    @Mapping(source = "teacherLesson.teacher.fullName", target = "teacherFullName")
    @Mapping(source = "reviewNote", target = "requestNote")
    @Mapping(source = "reviewedBy.id", target = "reviewedById")
    @Mapping(source = "reviewedBy.fullName", target = "reviewedByFullName")
    @Mapping(source = "requestedAt", target = "requestedAt")
    @Mapping(source = "reviewedAt", target = "reviewedAt")
    @Mapping(source = "teacherLesson.lesson.credit", target = "credit")
    @Mapping(source = "teacherLesson.lesson.ects", target = "ects")
    EnrollmentRequestResponseDTO toResponse(EnrollmentRequest enrollmentRequest);
}
