package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.author.AuthorCreationRequest;
import com.nhom678.server.dto.request.author.AuthorUpdateRequest;
import com.nhom678.server.dto.response.AuthorResponse;
import com.nhom678.server.entity.Author;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    Author toAuthor(AuthorCreationRequest request);
    AuthorResponse toAuthorResponse(Author author);
    void updateAuthor(@MappingTarget Author author, AuthorUpdateRequest authorUpdateRequest);
}
