package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.admin.AdminCreationRequest;
import com.nhom678.server.dto.request.admin.AdminUpdateRequest;
import com.nhom678.server.dto.response.LibrarianResponse;
import com.nhom678.server.mapper.LibrarianMapper;
import com.nhom678.server.repositories.LibrarianRepository;
import com.nhom678.server.services.LibrarianService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class LibrarianServiceImpl implements LibrarianService {

    LibrarianRepository librarianRepository;
    LibrarianMapper librarianMapper;

    @Override
    public LibrarianResponse createLibrarian(AdminCreationRequest request) {
        return null;
    }

    @Override
    public List<LibrarianResponse> getAllLibrarian() {
        return List.of();
    }

    @Override
    public LibrarianResponse updateLibrarian(Integer librarianId, AdminUpdateRequest request) {
        return null;
    }

    @Override
    public void deleteLibrarian(Integer librarianId) {

    }

    @Override
    public LibrarianResponse getLibrarianById(Integer librarianId) {
        return null;
    }
}
