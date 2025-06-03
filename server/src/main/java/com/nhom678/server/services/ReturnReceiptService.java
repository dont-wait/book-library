package com.nhom678.server.services;

import com.nhom678.server.dto.request.returnReceipt.ReturnReceiptRequest;
import com.nhom678.server.dto.response.ReturnReceiptResponse;

import java.util.List;

public interface ReturnReceiptService {

    ReturnReceiptResponse createReturnReceipt(ReturnReceiptRequest request);
    List<ReturnReceiptResponse> getAllReturnReceipts();
    ReturnReceiptResponse getByIdReturnReceipt(String id);
    ReturnReceiptResponse updateReturnReceipt(String id, ReturnReceiptRequest  request);
    void deleteReturnReceipt(String id);
}
