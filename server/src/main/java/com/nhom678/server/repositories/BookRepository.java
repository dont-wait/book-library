package com.nhom678.server.repositories;

import com.nhom678.server.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Optional<Book> findBookByIsbn(String isbn);
    Boolean existsBookByIsbn(String isbn);
    void deleteBookByIsbn(String isbn);
    void deleteBookByBookName(String bookName);
}
