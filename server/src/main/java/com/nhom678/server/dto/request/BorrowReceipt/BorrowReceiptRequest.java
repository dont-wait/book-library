package com.nhom678.server.dto.request.BorrowReceipt;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BorrowReceiptRequest {

    String borrowReceiptId;
    Date borrowDate;
    Date dueDate;
    Integer quantity;
    int bookId;
    String userId;
    String statusBookName;
}
