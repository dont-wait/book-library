package com.nhom678.server.dto.request.lecture;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LectureUpdateRequest {
    String firstName;
    String lastName;
    String email;   
    String phone;
}
