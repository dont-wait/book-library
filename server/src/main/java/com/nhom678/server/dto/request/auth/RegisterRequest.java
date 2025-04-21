package com.nhom678.server.dto.request.auth;

import com.nhom678.server.entity.UserRole;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "ID is required")
    private String id;

    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Role is required")
    private UserRole role;

    @NotBlank(message = "Entity ID is required")
    private String entityId;
} 