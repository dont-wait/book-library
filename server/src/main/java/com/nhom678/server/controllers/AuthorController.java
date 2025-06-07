package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.author.AuthorCreationRequest;
import com.nhom678.server.dto.request.author.AuthorUpdateRequest;
import com.nhom678.server.dto.response.AuthorResponse;
import com.nhom678.server.services.AuthorService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/authors")
public class AuthorController {
    AuthorService authorService;
    @GetMapping
    ApiResponse<List<AuthorResponse>> getAllAuthor() {
        return ApiResponse.<List<AuthorResponse>>builder()
                .result(authorService.getAllAuthor())
                .message("Success").build();
    }

    @PostMapping
    ApiResponse<AuthorResponse> createAuthor(@RequestBody AuthorCreationRequest request) {
        return ApiResponse.<AuthorResponse>builder()
                .result(authorService.createAuthor(request))
                .message("Success")
                .build();
    }

    @DeleteMapping("/{authorId}")
    ApiResponse<String> deleteAuthor(@PathVariable Integer authorId) {
        authorService.deleteAuthor(authorId);
        return ApiResponse.<String>builder()
                .result("Delete author has id: " + authorId)
                .message("Success")
                .build();
    }

    @PutMapping("/{authorId}")
    ApiResponse<AuthorResponse> updateAuthor(@PathVariable Integer authorId, @RequestBody AuthorUpdateRequest request) {
        return ApiResponse.<AuthorResponse>builder()
                .result(authorService.updateAuthor(authorId, request))
                .message("Success")
                .build();
    }
}
