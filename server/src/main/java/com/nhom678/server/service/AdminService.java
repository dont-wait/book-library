package com.nhom678.server.service;

import com.nhom678.server.dto.request.admin.AdminCreationRequest;
import com.nhom678.server.dto.request.admin.AdminUpdateRequest;
import com.nhom678.server.dto.response.AdminResponse;

import java.util.List;

public interface AdminService {
    AdminResponse getMyInfo();
    AdminResponse createAdmin(AdminCreationRequest request);
    List<AdminResponse> getAllAdmin();
    AdminResponse getAdminById(String  adminId);
    AdminResponse updateAdmin(String adminId, AdminUpdateRequest request);
    void deleteAdmin(String adminId);
}
