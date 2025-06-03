package com.nhom678.server.repositories;

import com.nhom678.server.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>, JpaSpecificationExecutor<Book> {
    Page<Book> findAll(Pageable pageable);
    Optional<Book> findBookByIsbn(String isbn);
    Optional<Book> findBookByBookName(String bookName);
    Optional<Book> findBookByBookId(Integer bookId);
    Boolean existsBookByIsbn(String isbn);
    Boolean existsBookByBookName(String bookName);
    void deleteBookByBookName(String bookName);
}
