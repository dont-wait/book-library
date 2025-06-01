package com.nhom678.server.services;

import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptCreationRequest;
import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptUpdateRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;

import java.util.List;

import com.nhom678.server.dto.request.BorrowReceipt.BorrowReceiptRequest;

public interface BorrowReceiptService
{

    BorrowReceiptResponse createBorrowReceipt(BorrowReceiptCreationRequest dto);

    List<BorrowReceiptResponse> getAll();

    List<BorrowReceiptResponse> getByUserId(String userId);

    BorrowReceiptResponse updateBorrowReceipt(BorrowReceiptUpdateRequest dto);

    void deleteBorrowReceipt(String borrowReceiptId);

}
