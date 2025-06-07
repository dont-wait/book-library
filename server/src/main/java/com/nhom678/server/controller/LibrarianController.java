package com.nhom678.server.controller;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.librarian.LibrarianCreationRequest;
import com.nhom678.server.dto.request.librarian.LibrarianUpdateRequest;
import com.nhom678.server.dto.response.LibrarianResponse;
import com.nhom678.server.service.LibrarianService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/librarians")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LibrarianController {

    LibrarianService librarianService;

    @GetMapping
    ApiResponse<List<LibrarianResponse>> getAllLibrarians() {
        return ApiResponse.<List<LibrarianResponse>>builder()
                .result(librarianService.getAllLibrarian())
                .message("Success")
                .build();
    }

    @PostMapping
    ApiResponse<LibrarianResponse> createLibrarian(@Valid @RequestBody LibrarianCreationRequest request) {
        return ApiResponse.<LibrarianResponse>builder()
                .result(librarianService.createLibrarian(request))
                .message("Success")
                .build();
    }

    @GetMapping("/myInfo")
    ApiResponse<LibrarianResponse> getMyInfo() {
        return ApiResponse.<LibrarianResponse>builder()
                .result(librarianService.getMyInfo())
                .message("Success")
                .build();
    }

    @GetMapping("/{librarianId}")
    ApiResponse<LibrarianResponse> getLibrarianById(@PathVariable String librarianId) {
        return ApiResponse.<LibrarianResponse>builder()
                .result(librarianService.getLibrarianById(librarianId))
                .message("Success")
                .build();
    }

    @PutMapping("/{librarianId}")
    ApiResponse<LibrarianResponse> updateLibrarian(@PathVariable String librarianId,
                                                   @Valid @RequestBody LibrarianUpdateRequest request) {
        return ApiResponse.<LibrarianResponse>builder()
                .result(librarianService.updateLibrarian(librarianId, request))
                .message("Success")
                .build();
    }

    @DeleteMapping("/{librarianId}")
    ApiResponse<String> deleteLibrarian(@PathVariable String librarianId) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        librarianService.deleteLibrarian(librarianId);
        apiResponse.setMessage("Success");
        apiResponse.setResult(String.format("Deleted successfully Librarian with id: %s", librarianId));
        return apiResponse;
    }
}