package com.ilker.obsystem.mapper;

import com.ilker.obsystem.dto.response.TeacherInfDTO;
import com.ilker.obsystem.entity.Teacher;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TeacherMapper {
    @Mapping(source = "department.name", target = "departmentName")
    @Mapping(source = "department.faculty.name", target = "facultyName")
    @Mapping(source = "user.email", target = "email")
    TeacherInfDTO toTeacherInfDTO(Teacher teacher);
}
