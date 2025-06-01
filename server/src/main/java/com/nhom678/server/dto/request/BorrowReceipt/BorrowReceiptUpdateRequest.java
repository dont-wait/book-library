package com.nhom678.server.dto.request.borrowReceipt;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BorrowReceiptUpdateRequest {
//    @NotNull(message = "borrowReceiptId is required")
    String borrowReceiptId;

    LocalDate borrowDate;
    LocalDate dueDate;
    Integer quantity;
    Integer bookId;
    String userId;
    String statusName;
}
