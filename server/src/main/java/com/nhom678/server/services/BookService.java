package com.nhom678.server.services;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.request.book.BookSearchCriteria;
import com.nhom678.server.dto.request.book.BookUpdateRequest;
import com.nhom678.server.dto.response.BookResponse;

import java.util.List;

public interface BookService {
    BookResponse createBook(BookCreationRequest request);
    List<BookResponse> getAllBooks(int page, int size, Integer categoryId);
    BookResponse updateBook(Integer bookId, BookUpdateRequest request);
    void deleteBook(Integer bookId);
    List<BookResponse> searchBooks(BookSearchCriteria request);
}
