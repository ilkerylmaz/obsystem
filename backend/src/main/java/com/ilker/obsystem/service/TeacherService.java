package com.ilker.obsystem.service;

import com.ilker.obsystem.dto.response.TeacherInfDTO;

import java.util.List;

public interface TeacherService {
    public List<TeacherInfDTO> getTeacherInfoById(Long teacherId);
}
