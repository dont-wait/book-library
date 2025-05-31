package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.BorrowReceipt.BorrowReceiptRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;
import com.nhom678.server.services.BorrowReceiptService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/borrow_receipt")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BorrowReceiptController {
    BorrowReceiptService borrowReceiptService;

    @PostMapping
    ApiResponse<BorrowReceiptResponse> createBorrowReceipt(@RequestBody BorrowReceiptRequest request) {
        BorrowReceiptResponse borrowReceiptResponse = borrowReceiptService.createBorerowReceipt(request);
        return ApiResponse.<BorrowReceiptResponse>builder()
                .message("success").result(borrowReceiptResponse).build();
    }

    @GetMapping
    ApiResponse<List<BorrowReceiptResponse>> getAllBorrowReceipt() {
        List<BorrowReceiptResponse> borrowReceiptResponses = borrowReceiptService.getAllBorrowReceipt();
        return ApiResponse.<List<BorrowReceiptResponse>>builder()
                .message("Success").result(borrowReceiptResponses).build();
    }

    @GetMapping("/{id}")
    ApiResponse<BorrowReceiptResponse> getByIdBorrowReceipt(@PathVariable String id) {
        BorrowReceiptResponse borrowReceiptResponse = borrowReceiptService.getByIdBorrowReceipt(id);
        return ApiResponse.<BorrowReceiptResponse>builder()
                .message("Success").result(borrowReceiptResponse).build();
    }

    @PutMapping("/{id}")
    ApiResponse<BorrowReceiptResponse> updateBorrowReceipt(@PathVariable String id, @RequestBody BorrowReceiptRequest request) {
        BorrowReceiptResponse borrowReceiptResponse = borrowReceiptService.updateBorrowReceipt(id, request);
        return ApiResponse.<BorrowReceiptResponse>builder()
                .message("Sucess").result(borrowReceiptResponse).build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteBorrowReceipt(@PathVariable String id)
    {
        borrowReceiptService.deleteBorrowReceipt(id);
        return  ApiResponse.<String>builder()
                .message("Suceess").result("delete").build();
    }

}
