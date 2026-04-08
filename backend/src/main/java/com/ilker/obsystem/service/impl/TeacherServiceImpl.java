package com.ilker.obsystem.service.impl;

import com.ilker.obsystem.dto.response.TeacherInfDTO;
import com.ilker.obsystem.entity.Teacher;
import com.ilker.obsystem.mapper.TeacherMapper;
import com.ilker.obsystem.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.ilker.obsystem.repository.TeacherRepository;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;

    @Override
    public TeacherInfDTO getTeacherInfoById(Long teacherId) {
        Teacher teacher = teacherRepository.getTeacherInfoById(teacherId)
                .orElseThrow(() -> new RuntimeException("run time Error"));
        return teacherMapper.toTeacherInfDTO(teacher);
    }
}
