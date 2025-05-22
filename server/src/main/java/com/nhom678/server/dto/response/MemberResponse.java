package com.nhom678.server.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MemberResponse {
    String memberId;
    String firstName;
    String lastName;
    String email;
    String phone;
}
