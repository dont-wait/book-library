package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.author.AuthorCreationRequest;
import com.nhom678.server.dto.response.AuthorResponse;
import com.nhom678.server.entity.Author;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.mapper.AuthorMapper;
import com.nhom678.server.repositories.AuthorRepository;
import com.nhom678.server.services.AuthorService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    public AuthorResponse createAuthor(AuthorCreationRequest request) {
        if(authorRepository.existsAuthorByAuthorName(request.getAuthorName()))
            throw new AppException(ErrorCode.AUTHOR_NAME_EXISTED);
        Author author = authorMapper.toAuthor(request);
        return authorMapper.toAuthorResponse(authorRepository.save(author));
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN', 'MEMBER')")
    public AuthorResponse getAuthorById(Integer authorId) {

        return authorMapper.toAuthorResponse(authorRepository
                .findById(authorId)
                .orElseThrow(()
                        -> new AppException(ErrorCode.AUTHOR_NOT_FOUND)));
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN', 'MEMBER')")
    public List<AuthorResponse> getAllAuthor() {
        return authorRepository.findAll()
                .stream()
                .map(authorMapper::toAuthorResponse).toList();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    public void deleteAuthor(Integer authorId) {
        if (!authorRepository.existsById(authorId)) {
            throw new AppException(ErrorCode.AUTHOR_NOT_FOUND);
        }
        authorRepository.deleteAuthorByAuthorId(authorId);
    }
}
