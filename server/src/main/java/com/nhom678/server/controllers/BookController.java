package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.response.BookResponse;
import com.nhom678.server.services.BookService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookController {

    BookService bookService;

    @PostMapping
    ApiResponse<BookResponse> createBook(@Valid  @RequestBody BookCreationRequest request) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.createBook(request))
                .message("Success").build();
    }
    @GetMapping("/search")
    ApiResponse<BookResponse> getBook(
        @RequestParam(required = false) String isbn,
        @RequestParam(required = false) String bookName) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.getBook(isbn, bookName))
                .message("Success").build();
    }
    @GetMapping
    ApiResponse<List<BookResponse>> getBooks() {
        ApiResponse<List<BookResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(bookService.getAllBooks());
        apiResponse.setMessage("Success");
        return apiResponse;
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
