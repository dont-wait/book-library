package com.nhom678.server.dto.request.borrowReceiptV2;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BorrowReceiptCreationRequest {

    @NotNull(message = "borrowDate is required")
    LocalDate borrowDate;

    @NotNull(message = "dueDate is required")
    LocalDate dueDate;

    @NotNull(message = "quantity is required")
    Integer quantity;

    @NotNull(message = "bookId is required")
    Integer bookId;

    @NotBlank
    @Size(min = 1, max = 11, message = "userId length must be between 1 and 11")
    String userId;

    @NotNull(message = "status name is required")
    String name;
}
