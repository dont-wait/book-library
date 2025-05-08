package com.nhom678.server.services;

import com.nhom678.server.dto.request.author.AuthorCreateRequest;
import com.nhom678.server.dto.request.category.CategoryCreateRequest;
import com.nhom678.server.dto.response.AuthorResponse;
import com.nhom678.server.dto.response.CategoryResponse;

import java.util.List;

public interface AuthorService {
    AuthorResponse createAuthor(AuthorCreateRequest request);
    AuthorResponse getAuthorByName(String authorName);
    List<AuthorResponse> getAllAuthor();
    void deleteAuthor(Integer authorId);

}
