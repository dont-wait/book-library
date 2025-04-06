package com.nhom678.server.dto.request.student;


import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class StudentCreateRequest {

    @Size(min = 1, max = 10, message = "ID_EXISTED")
    String studentId;
    String firstName;
    String lastName;

    @Size(min = 10, max = 50, message = "EMAIL_EXISTED")
    String email;
    @Size(min = 9, max = 11, message = "PHONE_EXISTED")
    String phone;
    String classId;
}
