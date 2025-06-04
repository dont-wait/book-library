package com.nhom678.server.controllers;


import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.returnReceipt.ReturnReceiptRequest;
import com.nhom678.server.dto.response.ReturnReceiptResponse;
import com.nhom678.server.services.ReturnReceiptService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/return-receipts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReturnReceiptController
{
    ReturnReceiptService returnReceiptService;

    @PostMapping
    ApiResponse<ReturnReceiptResponse> createReturnReceipt(@RequestBody ReturnReceiptRequest request) {
        ReturnReceiptResponse returnReceiptResponse = returnReceiptService.createReturnReceipt(request);
        return ApiResponse.<ReturnReceiptResponse>builder()
                .message("success")
                .result(returnReceiptResponse)
                .build();
    }

    @GetMapping
    ApiResponse<List<ReturnReceiptResponse>> getAllReturnReceipts() {
        List<ReturnReceiptResponse> returnReceiptResponse = returnReceiptService.getAllReturnReceipts();
        return ApiResponse.<List<ReturnReceiptResponse>>builder()
                .message("success")
                .result(returnReceiptResponse)
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<ReturnReceiptResponse> getReturnReceiptById(@PathVariable String id) {
        ReturnReceiptResponse returnReceiptResponse = returnReceiptService.getByIdReturnReceipt(id);
        return ApiResponse.<ReturnReceiptResponse>builder()
                .message("success")
                .result(returnReceiptResponse)
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<ReturnReceiptResponse> updateReturnReceipt(@PathVariable String id,
                                                           @RequestBody ReturnReceiptRequest request) {
        ReturnReceiptResponse returnReceiptResponse = returnReceiptService.updateReturnReceipt(id, request);
        return ApiResponse.<ReturnReceiptResponse>builder()
                .message("success")
                .result(returnReceiptResponse)
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteReturnReceipt(@PathVariable String id) {
        returnReceiptService.deleteReturnReceipt(id);
        return ApiResponse.<String>builder()
                .message("success")
                .result("Deleted")
                .build();
    }

}
