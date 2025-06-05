package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.librarian.LibrarianCreationRequest;
import com.nhom678.server.dto.request.librarian.LibrarianUpdateRequest;
import com.nhom678.server.dto.response.LibrarianResponse;
import com.nhom678.server.entity.Librarian;
import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.enums.UserRole;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.mapper.LibrarianMapper;
import com.nhom678.server.repositories.LibrarianRepository;
import com.nhom678.server.repositories.UserAccountRepository;
import com.nhom678.server.services.LibrarianService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LibrarianServiceImpl implements LibrarianService {

    LibrarianRepository librarianRepository;
    LibrarianMapper librarianMapper;
    UserAccountRepository userAccountRepository;
    PasswordEncoder passwordEncoder;

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
        userAccount.setPassword(passwordEncoder.encode(request.getPassword())); //hash password
        userAccount.setIsActivated(true);

        HashSet<String> roles = new HashSet<>();
        roles.add(UserRole.LIBRARIAN.name());
        userAccount.setRoles(roles);
        userAccount.setLibrarian(librarian);
        userAccountRepository.save(userAccount);
        librarian.setUserAccount(userAccount);

        return librarianMapper.toLibrarianResponse(librarianRepository.save(librarian));
    }

    @Override
    public List<LibrarianResponse> getAllLibrarian() {
        return librarianRepository.findAll()
                .stream()
                .map(librarianMapper::toLibrarianResponse)
                .toList();
    }
    @Override
    @PreAuthorize( "hasRole('LIBRARIAN')")
    public LibrarianResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String librarianId = context.getAuthentication().getName();
        Librarian librarian = librarianRepository.findByLibrarianId(librarianId)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));
        return librarianMapper.toLibrarianResponse(librarian);
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