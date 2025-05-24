package com.nhom678.server.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserAccountResponse {
    String userId;
    String password;
    Boolean isActived;
    Set<String> roles;
}
