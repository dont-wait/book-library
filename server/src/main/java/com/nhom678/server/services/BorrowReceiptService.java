package com.nhom678.server.services;

import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptCreationRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;

import java.util.List;

import com.nhom678.server.dto.request.BorrowReceipt.BorrowReceiptRequest;
import com.nhom678.server.dto.request.ReturnReceipt.ReturnReceiptRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;
import com.nhom678.server.dto.response.ReturnReceiptResponse;

import java.util.List;

public interface BorrowReceiptService
{
    BorrowReceiptResponse createBorerowReceipt(BorrowReceiptRequest request);
    List<BorrowReceiptResponse> getAllBorrowReceipt();
    BorrowReceiptResponse getByIdBorrowReceipt(String id);
    BorrowReceiptResponse updateBorrowReceipt(String id, BorrowReceiptRequest request);
    void deleteBorrowReceipt(String id);
//    com.nhom678.server.entity.BorrowReceipt createBorrowReceipt(BorrowReceiptDTO dto);

    BorrowReceiptResponse createBorrowReceipt(BorrowReceiptCreationRequest dto);

    List<BorrowReceiptResponse> getAll();

    List<BorrowReceiptCreationRequest> getByUserId(String userId);
}
