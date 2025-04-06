package com.nhom678.server.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhom678.server.dto.request.student.StudentCreateRequest;
import com.nhom678.server.dto.request.student.StudentUpdateRequest;
import com.nhom678.server.dto.response.StudentResponse;
import com.nhom678.server.entity.Student;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.exceptions.ErrorCode;
import com.nhom678.server.mapper.StudentMapper;
import com.nhom678.server.repositories.StudentRepository;
import com.nhom678.server.services.StudentService;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StudentServiceImpl implements StudentService {

    StudentRepository studentRepository;
    StudentMapper studentMapper;
    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, StudentMapper studentMapper) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponse> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(studentMapper::toStudentResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponse getStudentById(String studentId) {
        return studentMapper.toStudentResponse(studentRepository.findStudentByStudentId(studentId)
                .orElseThrow(
                        () -> new AppException(ErrorCode.STUDENT_NOT_FOUND)
                )
        );
    }

    @Override
    @Transactional
    public StudentResponse addStudent(StudentCreateRequest request) {
        if(studentRepository.existsStudentByStudentId(request.getStudentId()))
            throw new AppException(ErrorCode.ID_EXISTED);
        if(studentRepository.existsStudentByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        if(studentRepository.existsStudentByPhone(request.getPhone()))
            throw new AppException(ErrorCode.PHONE_EXISTED);

        Student student = studentMapper.toStudent(request);
        return studentMapper.toStudentResponse(studentRepository.save(student));
    }

    @Override
    @Transactional
    public StudentResponse updateStudent(String studentId, StudentUpdateRequest request) {
        Student student = studentRepository.findStudentByStudentId(studentId)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));
        
        // Check if email is being changed and if it already exists
        if (!student.getEmail().equals(request.getEmail()) && 
            studentRepository.existsStudentByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        
        // Check if phone is being changed and if it already exists
        if (!student.getPhone().equals(request.getPhone()) && 
            studentRepository.existsStudentByPhone(request.getPhone())) {
            throw new AppException(ErrorCode.PHONE_EXISTED);
        }
        
        // Update student using the mapper
        studentMapper.updateStudent(student, request);
        
        return studentMapper.toStudentResponse(studentRepository.save(student));
    }

    @Override
    @Transactional
    public void deleteStudent(String studentId) {
        if (!studentRepository.existsStudentByStudentId(studentId)) {
            throw new AppException(ErrorCode.STUDENT_NOT_FOUND);
        }
        studentRepository.deleteStudentByStudentId(studentId);
    }
}
