package com.nhom678.server.services;

import com.nhom678.server.dto.request.admin.AdminCreationRequest;
import com.nhom678.server.dto.request.admin.AdminUpdateRequest;
import com.nhom678.server.dto.response.AdminResponse;

import java.util.List;

public interface AdminService {
    AdminResponse createAdmin(AdminCreationRequest request);
    List<AdminResponse> getAllAdmin();
    AdminResponse getAdminById(Integer adminId);
    AdminResponse updateAdmin(Integer adminId, AdminUpdateRequest request);
    void deleteAdmin(Integer adminId);
}
