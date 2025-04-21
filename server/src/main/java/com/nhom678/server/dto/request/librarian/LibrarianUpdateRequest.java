package com.nhom678.server.dto.request.librarian;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LibrarianUpdateRequest {
    String firstName;
    String lastName;
    String email;
    String phone;
}