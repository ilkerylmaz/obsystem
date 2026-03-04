package com.ilker.obsystem.mapper;

import com.ilker.obsystem.dto.request.LessonCreateRequestDTO;
import com.ilker.obsystem.dto.request.LessonUpdateRequestDTO;
import com.ilker.obsystem.dto.response.LessonsDTO;
import com.ilker.obsystem.entity.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LessonMapper {
    // Admin'den gelen DTO'yu al, veritabanı Entity'sine çevir
    @Mapping(source = "departmentId", target = "department.id")
    @Mapping(target = "id", ignore = true) // Yeni ders eklediğimiz için ID'yi DB versin
    @Mapping(target = "createdAt", ignore = true) // Otomatik JPA Auditing dolacak
    Lesson toEntity(LessonCreateRequestDTO dto);
    //update işlemi
    @Mapping(source = "departmentId", target = "department.id")
    @Mapping(target = "id", ignore = true) // ID'yi biz elle set edeceğiz veya @MappingTarget halledecek
    @Mapping(target = "createdAt", ignore = true)
    void updateEntityFromDto(LessonUpdateRequestDTO updateRequestDTO, @MappingTarget Lesson lesson);

    //listeleme mapper'ı
    @Mapping(source = "ects", target = "ects")
    @Mapping(source = "department.id", target="departmentId")
    LessonsDTO toDto(Lesson lesson);
    List<LessonsDTO> toListEntity(List<Lesson> dto);
}
