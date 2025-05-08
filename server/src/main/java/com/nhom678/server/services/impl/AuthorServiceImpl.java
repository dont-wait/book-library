package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.author.AuthorCreateRequest;
import com.nhom678.server.dto.response.AuthorResponse;
import com.nhom678.server.entity.Author;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.exceptions.ErrorCode;
import com.nhom678.server.mapper.AuthorMapper;
import com.nhom678.server.repositories.AuthorRepository;
import com.nhom678.server.services.AuthorService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    AuthorRepository authorRepository;
    AuthorMapper authorMapper;

    @Override
    public AuthorResponse createAuthor(AuthorCreateRequest request) {
        if(authorRepository.existsAuthorByAuthorName(request.getAuthorName()))
            throw new AppException(ErrorCode.AUTHOR_NAME_EXISTED);
        Author author = authorMapper.toAuthor(request);
        return authorMapper.toAuthorResponse(authorRepository.save(author));
    }

    @Override
    public AuthorResponse getAuthorByName(String authorName) {

        return authorMapper.toAuthorResponse(authorRepository
                .findAuthorByAuthorName(authorName)
                .orElseThrow(() -> new AppException(ErrorCode.AUTHOR_NOT_FOUND)));
    }

    @Override
    public List<AuthorResponse> getAllAuthor() {
        return authorRepository.findAll()
                .stream()
                .map(authorMapper::toAuthorResponse).toList();
    }

    @Override
    public void deleteAuthor(Integer authorId) {
        authorRepository.deleteAuthorByAuthorId(authorId);
    }
}
