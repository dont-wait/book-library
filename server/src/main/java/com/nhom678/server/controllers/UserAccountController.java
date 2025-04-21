package com.nhom678.server.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom678.server.dto.request.auth.ChangePasswordRequest;
import com.nhom678.server.dto.request.auth.LoginRequest;
import com.nhom678.server.dto.request.auth.RegisterRequest;
import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.services.UserAccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class UserAccountController {

    @Autowired
    private UserAccountService userAccountService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            UserAccount account = userAccountService.createAccount(
                request.getEntityId(),
                request.getPassword(),
                request.getRole()
            );
            return ResponseEntity.ok(Map.of(
                "message", "Account created successfully",
                "accountId", account.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        return userAccountService.authenticate(request.getId(), request.getPassword())
            .map(account -> ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "accountId", account.getId(),
                "role", account.getRole().name()
            )))
            .orElse(ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials")));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        try {
            UserAccount account = userAccountService.updatePassword(
                request.getId(),
                request.getOldPassword(),
                request.getNewPassword()
            );
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/deactivate/{id}")
    public ResponseEntity<?> deactivateAccount(@PathVariable String id) {
        try {
            userAccountService.deactivateAccount(id);
            return ResponseEntity.ok(Map.of("message", "Account deactivated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/activate/{id}")
    public ResponseEntity<?> activateAccount(@PathVariable String id) {
        try {
            userAccountService.activateAccount(id);
            return ResponseEntity.ok(Map.of("message", "Account activated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 