package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.student.StudentCreateRequest;
import com.nhom678.server.dto.request.student.StudentUpdateRequest;
import com.nhom678.server.dto.response.StudentResponse;
import com.nhom678.server.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    Student toStudent(StudentCreateRequest student);
    StudentResponse toStudentResponse(Student student);
    void updateStudent(@MappingTarget Student student, StudentUpdateRequest request);
}
