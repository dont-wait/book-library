package com.nhom678.server.dto.request.student;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class StudentUpdateRequest {
    String firstName;
    String lastName;
    String email;
    String phone;
    String classId;
}
