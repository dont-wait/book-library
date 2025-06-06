package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.request.book.BookSearchCriteria;
import com.nhom678.server.dto.request.book.BookUpdateRequest;
import com.nhom678.server.dto.response.BookResponse;
import com.nhom678.server.services.BookService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookController {

    BookService bookService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MEMBER', 'LIBRARIAN')")
    ApiResponse<List<BookResponse>> getAllBooks(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "50") int size,
                                                @RequestParam(required = false) Integer categoryId
                                                ) {
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getAllBooks(page, size, categoryId))
                .message("Success")
                .build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    @PostMapping
    ApiResponse<BookResponse> createBook(@Valid @RequestBody BookCreationRequest request) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.createBook(request))
                .message("Success").build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    @PutMapping("{bookId}")
    ApiResponse<BookResponse> updateBook(@PathVariable Integer bookId,
                                         @Valid @RequestBody BookUpdateRequest request) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.updateBook(bookId, request))
                .message("Success")
                .build();
    }

    @PostMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN', 'MEMBER')")
    public ApiResponse<List<BookResponse>> searchBooks(@RequestBody BookSearchCriteria criteria) {
        List<BookResponse> result = bookService.searchBooks(criteria);
        return ApiResponse.<List<BookResponse>>builder()
                .result(result)
                .message("Success")
                .build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    @DeleteMapping("{bookId}")
    ApiResponse<String> deleteBook(@PathVariable Integer bookId) {
        bookService.deleteBook(bookId);
        return ApiResponse.<String>builder()
                .result("Deleted successfully")
                .message("Success")
                .build();
    }
}
