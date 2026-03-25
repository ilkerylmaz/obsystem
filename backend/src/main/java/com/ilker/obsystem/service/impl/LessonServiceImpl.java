package com.ilker.obsystem.service.impl;

import com.ilker.obsystem.dto.request.LessonCreateRequestDTO;
import com.ilker.obsystem.dto.request.LessonUpdateRequestDTO;
import com.ilker.obsystem.dto.response.LessonsDTO;
import com.ilker.obsystem.entity.Lesson;
import com.ilker.obsystem.mapper.LessonMapper;
import com.ilker.obsystem.repository.LessonRepository;
import com.ilker.obsystem.repository.NoteListRepository;
import com.ilker.obsystem.service.LessonService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
    @Autowired
    private final LessonRepository lessonRepository;
    private final NoteListRepository noteListRepository;
    private final LessonMapper lessonMapper;

    @Override
    @Transactional
    public void addLessonToStudent(LessonCreateRequestDTO createLessonDto) {
        if(lessonRepository.existsByCourseCode(createLessonDto.courseCode())){
            throw new RuntimeException("Hata: " + createLessonDto.courseCode() + " kodlu ders zaten mevcut!");
        }
        // 2. Dönüştür: DTO -> Entity (MapStruct)
        Lesson lesson = lessonMapper.toEntity(createLessonDto);

        // 3. Kaydet: Veritabanına gönder
        lessonRepository.save(lesson);
    }

    @Override
    @Transactional
    public void updateLesson(LessonUpdateRequestDTO updateLessonDto) {
        Lesson existingLesson = lessonRepository.findById(updateLessonDto.id())
                .orElseThrow(() -> new RuntimeException("ders bulunamadı"));

        if (!existingLesson.getCourseCode().equals(updateLessonDto.courseCode()) &&
                lessonRepository.existsByCourseCode(updateLessonDto.courseCode())) {
            throw new RuntimeException("Bu ders kodu zaten başka bir ders tarafından kullanılıyor!");
        }

        lessonMapper.updateEntityFromDto(updateLessonDto, existingLesson);

        lessonRepository.save(existingLesson);
    }

    @Override
    public List<LessonsDTO> listLessons() {
        List<Lesson> lesson = lessonRepository.findAll();
        return lessonMapper.toListEntity(lesson);
    }

    @Override
    public Long getLessonCount(Long studentId) {
        return noteListRepository.getStudentLessonsCount(studentId);
    }
}
