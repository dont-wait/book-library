package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.admin.AdminCreationRequest;
import com.nhom678.server.dto.request.admin.AdminUpdateRequest;
import com.nhom678.server.dto.response.AdminResponse;
import com.nhom678.server.entity.Admin;
import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.mapper.AdminMapper;
import com.nhom678.server.repositories.AdminRepository;
import com.nhom678.server.repositories.UserAccountRepository;
import com.nhom678.server.services.AdminService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.catalina.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminServiceImpl implements AdminService {

    AdminRepository adminRepository;
    AdminMapper adminMapper;
    UserAccountRepository userAccountRepository;

    @Override
    @Transactional
    public AdminResponse createAdmin(AdminCreationRequest request) {
        if(adminRepository.existsByAdminId(request.getAdminId()))
            throw new AppException(ErrorCode.ID_EXISTED);
        if(adminRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        if(adminRepository.existsByPhone(request.getPhone()))
            throw new AppException(ErrorCode.PHONE_EXISTED);

        Admin admin = adminMapper.toAdmin(request);

        UserAccount userAccount = new UserAccount();
        userAccount.setUserId(request.getAdminId());
        userAccount.setPassword(request.getPassword());
        userAccount.setRole("ADMIN");
        userAccount.setIsActived(true);

        userAccountRepository.save(userAccount);
        return adminMapper.toAdminResponse(adminRepository.save(admin));
    }

    @Override
    public List<AdminResponse> getAllAdmin() {
        return adminRepository.findAll()
                .stream()
                .map(adminMapper::toAdminResponse)
                .toList();
    }

    @Override
    public AdminResponse getAdminById(String adminId) {
        Admin admin = adminRepository.findByAdminId(adminId).orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        return adminMapper.toAdminResponse(admin);
    }

    @Override
    @Transactional
    public AdminResponse updateAdmin(String adminId, AdminUpdateRequest updateRequest) {

        Admin existingAdmin = adminRepository.findByAdminId(adminId)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(existingAdmin.getEmail()))
            if (adminRepository.existsByEmail(updateRequest.getEmail()))
                throw new AppException(ErrorCode.EMAIL_EXISTED);
        if(updateRequest.getPhone() != null && !updateRequest.getPhone().equals(existingAdmin.getPhone()))
            if(adminRepository.existsByPhone(updateRequest.getPhone()))
                throw new AppException(ErrorCode.PHONE_EXISTED);

        adminMapper.updateAdmin(existingAdmin, updateRequest);

        return adminMapper.toAdminResponse(existingAdmin);
    }

    @Override
    public void deleteAdmin(String adminId) {
        adminRepository.deleteByAdminId(adminId);
    }
}
