package com.nhom678.server.repositories;

import com.nhom678.server.dto.request.book.BookSearchCriteria;
import com.nhom678.server.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>, JpaSpecificationExecutor<Book> {
    Optional<Book> findBookByIsbn(String isbn);
    Optional<Book> findBookByBookName(String bookName);
    Optional<Book> findBookByBookId(Integer bookId);
    Boolean existsBookByIsbn(String isbn);
    Boolean existsBookByBookName(String bookName);
    void deleteBookByBookName(String bookName);
}
