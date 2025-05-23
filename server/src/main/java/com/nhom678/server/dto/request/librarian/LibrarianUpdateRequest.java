package com.nhom678.server.dto.request.librarian;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;


@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LibrarianUpdateRequest {

    String firstName;

    String lastName;

    @Email
    String email;

    @Size(min = 10, max = 11, message = "PHONE_MUST_BE_OR_10_11_CHARACTERS")
    String phone;

}
