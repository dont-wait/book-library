package com.nhom678.server.service;

import com.nhom678.server.dto.response.UserAccountResponse;

import java.util.List;

public interface UserAccountService {
    List<UserAccountResponse> findAll();
}

