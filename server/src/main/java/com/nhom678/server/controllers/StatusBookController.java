package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.BorrowReceipt.BorrowReceiptRequest;
import com.nhom678.server.dto.request.StatusBook.StatusBookRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;
import com.nhom678.server.dto.response.StatusBookResponse;
import com.nhom678.server.services.StatusBookService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/status_book")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusBookController
{
    StatusBookService statusBookService;

    @PostMapping
    ApiResponse<StatusBookResponse> createStatusBook(@RequestBody StatusBookRequest request)
    {
        StatusBookResponse statusBookResponse = statusBookService.createStatusBook(request);
        return ApiResponse.<StatusBookResponse>builder()
                .message("success").result(statusBookResponse).build();
    }

    @GetMapping
    ApiResponse<List<StatusBookResponse>> getAllStatusBook() {
        List<StatusBookResponse> statusBookResponses = statusBookService.getAllStatusBook();
        return ApiResponse.<List<StatusBookResponse>>builder()
                .message("Success").result(statusBookResponses).build();
    }

    @GetMapping("/{id}")
    ApiResponse<StatusBookResponse> getByIdStatusBook(@PathVariable String id) {
        StatusBookResponse statusBookResponse = statusBookService.getByIdStatusBook(id);
        return ApiResponse.<StatusBookResponse>builder()
                .message("Success").result(statusBookResponse).build();
    }

    @PutMapping("/{id}")
    ApiResponse<StatusBookResponse> updateStatusBook(@PathVariable String id, @RequestBody StatusBookRequest request) {
        StatusBookResponse statusBookResponse = statusBookService.updateStatusBook(id, request);
        return ApiResponse.<StatusBookResponse>builder()
                .message("Sucess").result(statusBookResponse).build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteStatusBook(@PathVariable String id)
    {
        statusBookService.deleteStatusBook(id);
        return  ApiResponse.<String>builder()
                .message("Suceess").result("delete").build();
    }
}
