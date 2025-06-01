package com.nhom678.server.dto.response;

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
public class ReturnReceiptResponse
{
    String returnReceiptId;
    Date returnDate;
    String borrowReceiptId;
    String statusBookName;

}
