package com.nhom678.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.student.StudentCreateRequest;
import com.nhom678.server.dto.request.student.StudentUpdateRequest;
import com.nhom678.server.dto.response.StudentResponse;
import com.nhom678.server.services.StudentService;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

@RequestMapping("api/v1/students")
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StudentController {
    StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("{studentId}")
    ResponseEntity<ApiResponse<StudentResponse>> getStudentById(@PathVariable String studentId) {
        ApiResponse<StudentResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentService.getStudentById(studentId));
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping
    ResponseEntity<ApiResponse<List<StudentResponse>>> getAllStudents() {
        ApiResponse<List<StudentResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentService.getAllStudents());
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping
    ResponseEntity<ApiResponse<StudentResponse>> addStudent(@RequestBody StudentCreateRequest request) {
        ApiResponse<StudentResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentService.addStudent(request));
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("{studentId}")
    ResponseEntity<ApiResponse<StudentResponse>> updateStudent(@PathVariable String studentId, @RequestBody StudentUpdateRequest request) {
        ApiResponse<StudentResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentService.updateStudent(studentId, request));
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("{studentId}")
    ResponseEntity<ApiResponse<String>> deleteStudent(@PathVariable String studentId) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        studentService.deleteStudent(studentId);
        apiResponse.setResult("Student successfully deleted");
        return ResponseEntity.ok(apiResponse);
    }
}
