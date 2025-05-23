package com.nhom678.server.services;

import com.nhom678.server.dto.request.AuthenticationRequest;
import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.repositories.UserAccountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthenticationService {
    UserAccountRepository userAccountRepository;

    public Boolean authenticate(AuthenticationRequest request) {
        UserAccount userAccount = userAccountRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        return passwordEncoder.matches(request.getPassword(), userAccount.getPassword());
    }
}
