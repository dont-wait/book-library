package com.nhom678.server.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.entity.UserRole;
import com.nhom678.server.repositories.UserAccountRepository;

@Service
public class UserAccountService {
    
    @Autowired
    private UserAccountRepository userAccountRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public UserAccount createAccount(String entityId, String password, UserRole role) {
        if (userAccountRepository.existsByEntityId(entityId)) {
            throw new RuntimeException("Account with ID " + entityId + " already exists");
        }

        UserAccount account = new UserAccount();
        account.setId(entityId);
        account.setEntityId(entityId); 
        account.setPassword(passwordEncoder.encode(password));
        account.setRole(role); 
        account.setActive(true);
        account.setCreatedAt(LocalDateTime.now());
        return userAccountRepository.save(account);
    }

    public Optional<UserAccount> authenticate(String id, String password) {
        return userAccountRepository.findById(id)
                .filter(account -> account.isActive())
                .filter(account -> passwordEncoder.matches(password, account.getPassword()))
                .map(account -> {
                    account.setLastLogin(LocalDateTime.now());
                    return userAccountRepository.save(account);
                });
    }

    @Transactional
    public UserAccount updatePassword(String id, String oldPassword, String newPassword) {
        UserAccount account = userAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!passwordEncoder.matches(oldPassword, account.getPassword())) {
            throw new RuntimeException("Invalid old password");
        }

        account.setPassword(passwordEncoder.encode(newPassword));
        return userAccountRepository.save(account);
    }

    @Transactional
    public void deactivateAccount(String id) {
        UserAccount account = userAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        
        account.setActive(false);
        userAccountRepository.save(account);
    }

    @Transactional
    public void activateAccount(String id) {
        UserAccount account = userAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        
        account.setActive(true);
        userAccountRepository.save(account);
    }

    public Optional<UserAccount> getAccountById(String id) {
        return userAccountRepository.findById(id);
    }

    public Optional<UserAccount> getAccountByEntityId(String entityId) {
        return userAccountRepository.findByEntityId(entityId);
    }
} 