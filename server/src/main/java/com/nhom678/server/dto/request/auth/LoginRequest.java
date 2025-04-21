package com.nhom678.server.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "ID is required")
    private String id;

    @NotBlank(message = "Password is required")
    private String password;
} 