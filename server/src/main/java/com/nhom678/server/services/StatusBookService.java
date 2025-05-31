package com.nhom678.server.services;

import com.nhom678.server.dto.request.StatusBook.StatusBookRequest;
import com.nhom678.server.dto.response.StatusBookResponse;

import java.util.List;

public interface StatusBookService {
    StatusBookResponse createStatusBook(StatusBookRequest request);
    List<StatusBookResponse> getAllStatusBook();
    StatusBookResponse getByIdStatusBook(String name);
    StatusBookResponse updateStatusBook(String name, StatusBookRequest request);
    void deleteStatusBook(String name);
}
