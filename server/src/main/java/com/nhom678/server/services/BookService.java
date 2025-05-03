package com.nhom678.server.services;

import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.request.book.BookUpdateRequest;
import com.nhom678.server.dto.response.BookResponse;

import java.util.List;

public interface BookService {
    BookResponse createBook(BookCreationRequest request);
    List<BookResponse> searchBookByISBNAndBookName(String isbn, String bookName);
    List<BookResponse> getAllBooks();
    BookResponse updateBook(Integer bookId, BookUpdateRequest request);
    void deleteBook(String bookName);
}
