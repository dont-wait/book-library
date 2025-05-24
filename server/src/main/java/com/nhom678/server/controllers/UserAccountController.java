package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.response.UserAccountResponse;
import com.nhom678.server.services.UserAccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user-accounts")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserAccountController {
    UserAccountService userAccountService;

    @GetMapping
    ApiResponse<List<UserAccountResponse>> getAllUserAccount() {
        return ApiResponse.<List<UserAccountResponse>>builder()
                .result(userAccountService.findAll())
                .message("Success")
                .build();
    }
}
