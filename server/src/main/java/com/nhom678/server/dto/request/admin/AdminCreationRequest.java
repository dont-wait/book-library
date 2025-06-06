package com.nhom678.server.dto.request.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class    AdminCreationRequest {
    @NotBlank
    @Size(min = 10, max = 10, message = "ID_MUST_BE_10_CHARACTERS")
    String adminId;

    @NotBlank
    String firstName;
    @NotBlank
    String lastName;

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "INVALID_FORMAT_EMAIL")
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

    Set<String> roles;
}
