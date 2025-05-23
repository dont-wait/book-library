package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.librarian.LibrarianCreationRequest;
import com.nhom678.server.dto.request.librarian.LibrarianUpdateRequest;
import com.nhom678.server.dto.response.LibrarianResponse;
import com.nhom678.server.entity.Librarian;
import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.mapper.LibrarianMapper;
import com.nhom678.server.repositories.LibrarianRepository;
import com.nhom678.server.repositories.UserAccountRepository;
import com.nhom678.server.services.LibrarianService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LibrarianServiceImpl implements LibrarianService {

    LibrarianRepository librarianRepository;
    LibrarianMapper librarianMapper;
    UserAccountRepository userAccountRepository;

    @Override
    @Transactional
    public LibrarianResponse createLibrarian(LibrarianCreationRequest request) {
        if (librarianRepository.existsByLibrarianId(request.getLibrarianId()))
            throw new AppException(ErrorCode.ID_EXISTED);
        if (librarianRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (librarianRepository.existsByPhone(request.getPhone()))
            throw new AppException(ErrorCode.PHONE_EXISTED);

        Librarian librarian = librarianMapper.toLibrarian(request);
        librarianRepository.save(librarian);

        UserAccount userAccount = new UserAccount();
        userAccount.setUserId(request.getLibrarianId());
        userAccount.setPassword(request.getPassword());
        userAccount.setRole("LIBRARIAN");
        userAccount.setIsActived(true);
        userAccount.setLibrarian(librarian);
        userAccountRepository.save(userAccount);

        return librarianMapper.toLibrarianResponse(librarian);
    }

    @Override
    public List<LibrarianResponse> getAllLibrarian() {
        return librarianRepository.findAll()
                .stream()
                .map(librarianMapper::toLibrarianResponse)
                .toList();
    }

    @Override
    public LibrarianResponse getLibrarianById(String librarianId) {
        Librarian librarian = librarianRepository.findByLibrarianId(librarianId)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        return librarianMapper.toLibrarianResponse(librarian);
    }

    @Override
    @Transactional
    public LibrarianResponse updateLibrarian(String librarianId, LibrarianUpdateRequest updateRequest) {
        Librarian existingLibrarian = librarianRepository.findByLibrarianId(librarianId)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(existingLibrarian.getEmail()))
            if (librarianRepository.existsByEmail(updateRequest.getEmail()))
                throw new AppException(ErrorCode.EMAIL_EXISTED);

        if (updateRequest.getPhone() != null && !updateRequest.getPhone().equals(existingLibrarian.getPhone()))
            if (librarianRepository.existsByPhone(updateRequest.getPhone()))
                throw new AppException(ErrorCode.PHONE_EXISTED);

        librarianMapper.updateLibrarian(existingLibrarian, updateRequest);

        return librarianMapper.toLibrarianResponse(existingLibrarian);
    }

    @Override
    @Transactional
    public void deleteLibrarian(String librarianId) {
        if (!librarianRepository.existsByLibrarianId(librarianId))
            throw new AppException(ErrorCode.ID_NOT_FOUND);

        userAccountRepository.deleteByUserId(librarianId);
        librarianRepository.deleteByLibrarianId(librarianId);
    }
}