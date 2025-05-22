package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.admin.AdminCreationRequest;
import com.nhom678.server.dto.request.admin.AdminUpdateRequest;
import com.nhom678.server.dto.response.AdminResponse;
import com.nhom678.server.mapper.AdminMapper;
import com.nhom678.server.repositories.AdminRepository;
import com.nhom678.server.services.AdminService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminServiceImpl implements AdminService {

    AdminRepository adminRepository;
    AdminMapper adminMapper;

    @Override
    public AdminResponse createAdmin(AdminCreationRequest request) {
        return null;
    }

    @Override
    public List<AdminResponse> getAllAdmin() {
        return List.of();
    }

    @Override
    public AdminResponse getAdminById(Integer adminId) {
        return null;
    }

    @Override
    public AdminResponse updateAdmin(Integer adminId, AdminUpdateRequest request) {
        return null;
    }

    @Override
    public void deleteAdmin(Integer adminId) {

    }
}
