package com.nhom678.server.repositories;

import com.nhom678.server.entity.Librarian;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibrarianRepository extends JpaRepository<Librarian, String> {
    Optional<Librarian> findLibrarianById(String id);
    Boolean existsLibrarianId(String id);
    void deleteLibrarianById(String id);
}
