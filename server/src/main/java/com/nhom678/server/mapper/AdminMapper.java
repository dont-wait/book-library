package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.admin.AdminCreationRequest;
import com.nhom678.server.dto.request.admin.AdminUpdateRequest;
import com.nhom678.server.dto.response.AdminResponse;
import com.nhom678.server.entity.Admin;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    AdminResponse toAdminResponse(Admin admin);
    Admin toAdmin(AdminCreationRequest adminResponse);
    void updateAdmin(@MappingTarget Admin admin, AdminUpdateRequest request);
}
