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
import org.springframework.web.client.RestClient;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookController {

    BookService bookService;

    @GetMapping
    ApiResponse<List<BookResponse>> getAllBooks() {
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getAllBooks())
                .message("Success")
                .build();
    }

    @PostMapping
    ApiResponse<BookResponse> createBook(@Valid @RequestBody BookCreationRequest request) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.createBook(request))
                .message("Success").build();
    }

    @PutMapping("{bookId}")
    ApiResponse<BookResponse> updateBook(@PathVariable Integer bookId,
                                         @Valid @RequestBody BookUpdateRequest request) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.updateBook(bookId, request))
                .message("Success")
                .build();
    }


    @PostMapping("/search")
    public ApiResponse<List<BookResponse>> searchBooks(@RequestBody BookSearchCriteria criteria) {
        List<BookResponse> result = bookService.searchBooks(criteria);
        return ApiResponse.<List<BookResponse>>builder()
                .result(result)
                .message("Success")
                .build();
    }

    @DeleteMapping
    ApiResponse<String> deleteBook(@RequestParam String BookName) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        bookService.deleteBook(BookName);
        apiResponse.setMessage("Success");
        apiResponse.setResult("Deleted successfully") ;
        return apiResponse;
    }
}
