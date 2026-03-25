package com.ilker.obsystem.controller;

import com.ilker.obsystem.dto.response.TeacherInfDTO;

import java.util.List;

public interface TeacherController {
    public List<TeacherInfDTO> getTeacherInfoById(Long teacherId);
}
