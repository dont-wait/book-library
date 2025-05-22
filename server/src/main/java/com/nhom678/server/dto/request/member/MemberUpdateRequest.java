package com.nhom678.server.dto.request.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class MemberUpdateRequest {

    String firstName;

    String lastName;

    @Email
    String email;

    @Size(min = 10, max = 11, message = "PHONE_MUST_BE_OR_10_11_CHARACTERS")
    String phone;

    @Size(min = 6, message = "PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS")
    @Pattern(regexp = "^(?=.*[!@#$%^&*(),.?\":{}|<>]).*$",
            message = "PASSWORD_MUST_BE_INCLUDE_SPECIFY_CHARACTER(s)(e.g., *, $, etc.)")
    String password;
}
