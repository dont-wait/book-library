package com.nhom678.server.service.impl;

import com.nhom678.server.dto.response.UserAccountResponse;
import com.nhom678.server.mapper.UserAccountMapper;
import com.nhom678.server.repositories.UserAccountRepository;
import com.nhom678.server.service.UserAccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserAccountServiceImpl implements UserAccountService {

    UserAccountRepository userAccountRepository;
    UserAccountMapper userAccountMapper;

    @Override
    public List<UserAccountResponse> findAll() {
        return userAccountRepository.findAll()
                .stream()
                .map(userAccountMapper::toUserAccountResponse)
                .toList();
    }
}
