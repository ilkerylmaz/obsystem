package com.ilker.obsystem.service.impl;

import com.ilker.obsystem.dto.response.TeacherInfDTO;
import com.ilker.obsystem.entity.Teacher;
import com.ilker.obsystem.mapper.TeacherMapper;
import com.ilker.obsystem.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.ilker.obsystem.repository.TeacherRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;

    @Override
    public List<TeacherInfDTO> getTeacherInfoById(Long teacherId) {
        List<Teacher> list = teacherRepository.getTeacherInfoById(teacherId);
        return list.stream()
                .map(teacherMapper::toTeacherInfDTO).toList();
    }
}
