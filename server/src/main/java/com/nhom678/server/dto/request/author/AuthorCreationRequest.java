package com.nhom678.server.dto.request.author;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthorCreationRequest {

    @NotNull(message = "AUTHOR_NAME_REQUIRE")
    String authorName;

}
