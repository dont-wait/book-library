package com.nhom678.server.repositories;

import com.nhom678.server.entity.Admin;
import com.nhom678.server.entity.StatusBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusBookRepository extends JpaRepository<StatusBook, String> {
    Optional<StatusBook> findByName(String name);
    Boolean existsByName(String name);
    void deleteByName(String name);
}
