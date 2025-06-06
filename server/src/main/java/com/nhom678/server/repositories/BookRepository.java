package com.nhom678.server.repositories;

import com.nhom678.server.entity.Book;
import com.nhom678.server.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>, JpaSpecificationExecutor<Book> {
    Page<Book> findAll(Pageable pageable);
    Optional<Book> findBookByIsbn(String isbn);
    Optional<Book> findBookByBookName(String bookName);
    List<Book> findBookByCategory(Pageable pageable, Category category);
    Optional<Book> findBookByBookId(Integer bookId);
    Boolean existsBookByIsbn(String isbn);
    Boolean existsBookByBookName(String bookName);
    void deleteBookByBookId(Integer bookId);
}
