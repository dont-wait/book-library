package com.nhom678.server.controllers.borrowReceiptController;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptCreationRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;
import com.nhom678.server.services.BorrowReceiptService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/borrow-receipts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BorrowReceiptController {
     BorrowReceiptService service;

    @PostMapping
    ApiResponse<BorrowReceiptResponse> create(@RequestBody @Valid BorrowReceiptCreationRequest dto) {
        // Convert entity sang DTO trả về
        BorrowReceiptResponse response = service.createBorrowReceipt(dto);
        return ApiResponse.<BorrowReceiptResponse>builder()
                .result(response)
                .message("Success")
                .build();
    }
    @GetMapping
    public ResponseEntity<List<BorrowReceiptResponse>> getAll(){
        List<BorrowReceiptResponse> list=service.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BorrowReceiptCreationRequest>> getByUserId(@PathVariable String userId){
        List<BorrowReceiptCreationRequest> list =service.getByUserId(userId);
        return ResponseEntity.ok(list);
    }
}
