package com.nhom678.server.dto.request.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MemberUpdateRequest {

    String firstName;

    String lastName;

    @Email
    String email;

    @Size(min = 10, max = 11, message = "PHONE_MUST_BE_OR_10_11_CHARACTERS")
    String phone;

}
