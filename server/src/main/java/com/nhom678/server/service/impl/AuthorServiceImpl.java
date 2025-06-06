package com.nhom678.server.service.impl;

import com.nhom678.server.dto.request.author.AuthorCreationRequest;
import com.nhom678.server.dto.request.author.AuthorUpdateRequest;
import com.nhom678.server.dto.response.AuthorResponse;
import com.nhom678.server.entity.Author;
import com.nhom678.server.exception.AppException;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.mapper.AuthorMapper;
import com.nhom678.server.repositories.AuthorRepository;
import com.nhom678.server.service.AuthorService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    AuthorRepository authorRepository;
    AuthorMapper authorMapper;

    @Override
    public AuthorResponse createAuthor(AuthorCreationRequest request) {
        if(authorRepository.existsAuthorByAuthorName(request.getAuthorName()))
            throw new AppException(ErrorCode.AUTHOR_NAME_EXISTED);
        Author author = authorMapper.toAuthor(request);
        return authorMapper.toAuthorResponse(authorRepository.save(author));
    }

    @Override
    public AuthorResponse getAuthorById(Integer authorId) {

        return authorMapper.toAuthorResponse(authorRepository
                .findById(authorId)
                .orElseThrow(()
                        -> new AppException(ErrorCode.AUTHOR_NOT_FOUND)));
    }

    @Override
    public List<AuthorResponse> getAllAuthor() {
        return authorRepository.findAll()
                .stream()
                .map(authorMapper::toAuthorResponse).toList();
    }

    @Override
    @Transactional
    public void deleteAuthor(Integer authorId) {
        if (!authorRepository.existsById(authorId)) {
            throw new AppException(ErrorCode.AUTHOR_NOT_FOUND);
        }
        authorRepository.deleteAuthorByAuthorId(authorId);
    }

    @Override
    public AuthorResponse updateAuthor(Integer authorId, AuthorUpdateRequest request) {
        Author authorUpdate = authorRepository.findAuthorByAuthorId(authorId)
                .orElseThrow(() -> new AppException(ErrorCode.AUTHOR_ID_NOT_FOUND));
        authorMapper.updateAuthor(authorUpdate, request);
        return authorMapper.toAuthorResponse(authorRepository.save(authorUpdate));
    }
}
