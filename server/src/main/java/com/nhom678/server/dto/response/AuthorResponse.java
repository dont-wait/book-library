package com.nhom678.server.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.logging.Level;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthorResponse {
    Integer authorId;
    String authorName;
}
