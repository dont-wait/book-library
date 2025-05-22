package com.nhom678.server.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminResponse {
    String adminId;
    String firstName;
    String lastName;
    String email;
    String phone;
    String password;
}
