package com.ilker.obsystem.controller;

import com.ilker.obsystem.dto.response.TeacherInfDTO;

import java.util.List;
import java.util.Optional;

public interface TeacherController {
    public TeacherInfDTO getTeacherInfoById(Long teacherId);
}
