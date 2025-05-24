package com.nhom678.server.services;

import com.nhom678.server.dto.request.librarian.LibrarianCreationRequest;
import com.nhom678.server.dto.request.librarian.LibrarianUpdateRequest;
import com.nhom678.server.dto.response.AdminResponse;
import com.nhom678.server.dto.response.LibrarianResponse;

import java.util.List;

public interface LibrarianService {
    LibrarianResponse getMyInfo();
    LibrarianResponse createLibrarian(LibrarianCreationRequest request);
    List<LibrarianResponse> getAllLibrarian();
    LibrarianResponse getLibrarianById(String librarianId);
    LibrarianResponse updateLibrarian(String librarianId, LibrarianUpdateRequest request);
    void deleteLibrarian(String librarianId);
}