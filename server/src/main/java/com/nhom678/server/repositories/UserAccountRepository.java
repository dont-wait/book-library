package com.nhom678.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.entity.UserRole;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
    Optional<UserAccount> findByIdAndRole(String id, UserRole role);
    Optional<UserAccount> findByEntityId(String entityId);
    boolean existsByEntityId(String entityId);
} 