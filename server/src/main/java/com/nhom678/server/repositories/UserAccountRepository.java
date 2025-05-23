package com.nhom678.server.repositories;


import com.nhom678.server.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
    Optional<UserAccount> findByUserId(String userId);
    Boolean existsByUserId(String userId);
    void deleteByUserId(String userId);
}
