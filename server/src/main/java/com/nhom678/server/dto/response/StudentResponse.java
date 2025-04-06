package com.nhom678.server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponse {
    String studentId;
    String firstName;
    String lastName;
    String email;
    String phone;
    String classId;
}
