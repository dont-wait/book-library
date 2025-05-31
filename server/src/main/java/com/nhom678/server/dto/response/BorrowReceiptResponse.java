package com.nhom678.server.dto.response;


import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class BorrowReceiptResponse {

    String borrowReceiptId;
    LocalDate borrowDate;
    LocalDate dueDate;
    Integer quantity;
    String userId;
    String name;
    Integer bookId;
}
