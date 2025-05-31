package com.nhom678.server.services.impl;


import ch.qos.logback.core.status.StatusManager;
import com.nhom678.server.dto.request.StatusBook.StatusBookRequest;
import com.nhom678.server.dto.response.StatusBookResponse;
import com.nhom678.server.entity.StatusBook;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.mapper.StatusBookMapper;
import com.nhom678.server.repositories.StatusBookRepository;
import com.nhom678.server.services.StatusBookService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusBookServiceImpl implements StatusBookService
{
    StatusBookRepository statusBookRepository;
    StatusBookMapper statusBookMapper;

    @Override
    public StatusBookResponse createStatusBook(StatusBookRequest request)
    {
        if (statusBookRepository.existsById(request.getName()))
        {
            throw new AppException(ErrorCode.BOOK_NAME_EXISTED);
        }

        StatusBook statusBook = statusBookMapper.toPhieuTra(request);
        return statusBookMapper.toDto(statusBookRepository.save(statusBook));
    }

    @Override
    public List<StatusBookResponse> getAllStatusBook()
    {
        return statusBookRepository.findAll().stream()
                .map(statusBookMapper::toDto)
                .toList();
    }

    @Override
    public StatusBookResponse getByIdStatusBook(String name)
    {
        StatusBook statusBook = statusBookRepository.findById(name)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NAME_NOT_FOUND));
        return statusBookMapper.toDto(statusBook);
    }

    @Override
    public StatusBookResponse updateStatusBook(String name, StatusBookRequest request)
    {
        StatusBook statusBook = statusBookRepository.findById(name)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NAME_NOT_FOUND));

        statusBook.setDescription(request.getDescription());

        return statusBookMapper.toDto(statusBookRepository.save(statusBook));
    }

    @Override
    public void deleteStatusBook(String name)
    {
        if (!statusBookRepository.existsById(name))
        {
            throw new AppException(ErrorCode.BOOK_NAME_NOT_FOUND);
        }
        statusBookRepository.deleteById(name);
    }
}
