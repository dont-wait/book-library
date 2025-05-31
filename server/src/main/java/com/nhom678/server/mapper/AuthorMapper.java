package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.author.AuthorCreationRequest;
import com.nhom678.server.dto.response.AuthorResponse;
import com.nhom678.server.entity.Author;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    Author toAuthor(AuthorCreationRequest request);
    AuthorResponse toAuthorResponse(Author author);
}
