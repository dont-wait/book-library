package com.nhom678.server.repositories;


import com.nhom678.server.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
    Optional<UserAccount> findByUserId(String userId);
    Boolean existsByUserId(String userId);
    void deleteByUserId(String userId);
}
