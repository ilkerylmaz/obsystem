package com.ilker.obsystem.service;

import com.ilker.obsystem.dto.response.TeacherInfDTO;

import java.util.List;
import java.util.Optional;

public interface TeacherService {
    public TeacherInfDTO getTeacherInfoById(Long teacherId);
}
