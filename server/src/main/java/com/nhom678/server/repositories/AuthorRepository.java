package com.nhom678.server.repositories;

import com.nhom678.server.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {
    Boolean existsAuthorByAuthorName(String authorName);
    void deleteAuthorByAuthorId(Integer authorId);
    Optional<Author> findAuthorByAuthorId(Integer authorId);
}
