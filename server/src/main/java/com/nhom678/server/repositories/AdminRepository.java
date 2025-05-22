package com.nhom678.server.repositories;

import com.nhom678.server.entity.Admin;
import com.nhom678.server.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    Optional<Admin> findAdminById(String id);
    Boolean existsAdminId(String id);
    void deleteAdminById(String id);
}