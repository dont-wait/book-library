package com.nhom678.server.dto.request.member;

import com.nhom678.server.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MemberCreationRequest {

    @NotBlank
    String firstName;
    @NotBlank
    String lastName;

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email
    String email;

    @NotBlank(message = "PHONE_REQUIRED")
    @Size(min = 10, max = 11, message = "PHONE_MUST_BE_OR_10_11_CHARACTERS")
    String phone;

    //Tao luon bang UserAccount cung luc lun
    @NotBlank
    @Size(min = 6, message = "PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS")
    @Pattern(regexp = "^(?=.*[!@#$%^&*(),.?\":{}|<>]).*$",
            message = "PASSWORD_MUST_BE_INCLUDE_SPECIFY_CHARACTER(s)(e.g., *, $, etc.)")
    String password;
}
