package com.nhom678.server.dto.response;


import com.nhom678.server.entity.BorrowReceipt;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class StatusBookResponse {
    String name;
    Double fineCode;
    String description;
    List<BookResponse> borrowReceipt;
}
