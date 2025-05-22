package com.nhom678.server.services;

import com.nhom678.server.dto.request.admin.AdminCreationRequest;
import com.nhom678.server.dto.request.admin.AdminUpdateRequest;
import com.nhom678.server.dto.response.LibrarianResponse;

import java.util.List;

public interface LibrarianService {
    LibrarianResponse createLibrarian(AdminCreationRequest request);
    List<LibrarianResponse> getAllLibrarian();
    LibrarianResponse updateLibrarian(Integer librarianId, AdminUpdateRequest request);
    void deleteLibrarian(Integer librarianId);
    LibrarianResponse getLibrarianById(Integer librarianId);
}
