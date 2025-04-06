package com.nhom678.server.services;

import java.util.List;

import com.nhom678.server.dto.request.student.StudentCreateRequest;
import com.nhom678.server.dto.request.student.StudentUpdateRequest;
import com.nhom678.server.dto.response.StudentResponse;

public interface StudentService {
    List<StudentResponse> getAllStudents();
    StudentResponse getStudentById(String studentId);
    StudentResponse addStudent(StudentCreateRequest request);
    StudentResponse updateStudent(String studentId, StudentUpdateRequest request);
    void deleteStudent(String studentId);
}
