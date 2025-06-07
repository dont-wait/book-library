package com.nhom678.server.service;

import com.nhom678.server.dto.request.author.AuthorCreationRequest;
import com.nhom678.server.dto.request.author.AuthorUpdateRequest;
import com.nhom678.server.dto.response.AuthorResponse;

import java.util.List;

public interface AuthorService {
    AuthorResponse createAuthor(AuthorCreationRequest request);
    AuthorResponse getAuthorById(Integer authorId);
    List<AuthorResponse> getAllAuthor();
    void deleteAuthor(Integer authorId);
    AuthorResponse updateAuthor(Integer authorId, AuthorUpdateRequest request);
}
