package com.nhom678.server.services;

import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptCreationRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;

import java.util.List;

public interface BorrowReceiptService {
//    com.nhom678.server.entity.BorrowReceipt createBorrowReceipt(BorrowReceiptDTO dto);

    BorrowReceiptResponse createBorrowReceipt(BorrowReceiptCreationRequest dto);

    List<BorrowReceiptResponse> getAll();

    List<BorrowReceiptCreationRequest> getByUserId(String userId);
}
