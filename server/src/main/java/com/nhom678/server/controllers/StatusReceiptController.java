package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.entity.StatusReceipt;
import com.nhom678.server.repositories.StatusReceiptRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/status/status-receipts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatusReceiptController {
    StatusReceiptRepository statusReceiptRepository;

    @GetMapping
    ApiResponse<List<StatusReceipt>> getAllStatusReceipt() {
        return ApiResponse.<List<StatusReceipt>>builder()
                .result(statusReceiptRepository.findAll())
                .message("Get all status receipt Success")
                .build();
    }
}
