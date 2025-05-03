package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.book.BookCreationRequest;
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
    private final RestClient.Builder builder;

    @PostMapping
    ApiResponse<BookResponse> createBook(@Valid @RequestBody BookCreationRequest request) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.createBook(request))
                .message("Success").build();
    }

    @PutMapping("{bookId}")
    ApiResponse<BookResponse> updateBook(@PathVariable Integer bookId, @Valid @RequestBody BookUpdateRequest request) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.updateBook(bookId, request))
                .message("Success")
                .build();
    }

    @GetMapping("/search")
    ApiResponse<List<BookResponse>> searchBookByISBNAndBookName(
        @RequestParam(required = false) String isbn,
        @RequestParam(required = false) String bookName) {
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.searchBookByISBNAndBookName(isbn, bookName))
                .message("Success").build();
    }
    @GetMapping
    ApiResponse<List<BookResponse>> getBooks(@RequestParam(required = false) Integer categoryId) {

        if (categoryId != null) {
            return ApiResponse.<List<BookResponse>>builder()
                    .result(bookService.getBooksHaveCategoryId(categoryId))
                    .message("Success").build();
        }
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getAllBooks())
                .message("Success").build();
    }



    @DeleteMapping
    ApiResponse<String> deleteBook(@RequestParam(required = false) String BookName  ) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        bookService.deleteBook(BookName);
        apiResponse.setMessage("Success");
        apiResponse.setResult("Deleted successfully") ;
        return apiResponse;
    }
}
