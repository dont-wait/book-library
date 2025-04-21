package com.nhom678.server.dto.request.admin;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminUpdateRequest {
    String firstName;
    String lastName;
    String email;
    String phone;
}
