package com.nhom678.server.dto.request.returnReceipt;


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
public class ReturnReceiptRequest
{
    Date returnDate;
    String borrowReceiptId;
    String statusBookName;

}
