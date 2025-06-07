package com.nhom678.server.service.impl;

import com.nhom678.server.dto.request.returnReceipt.ReturnReceiptRequest;
import com.nhom678.server.dto.response.ReturnReceiptResponse;
import com.nhom678.server.entity.BorrowReceipt;
import com.nhom678.server.entity.ReturnReceipt;
import com.nhom678.server.entity.StatusBook;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.exception.AppException;
import com.nhom678.server.mapper.ReturnReceiptMapper;
import com.nhom678.server.repositories.BorrowReceiptRepository;
import com.nhom678.server.repositories.ReturnReceiptRepository;
import com.nhom678.server.repositories.StatusBookRepository;
import com.nhom678.server.service.ReturnReceiptService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReturnReceiptServiceImpl implements ReturnReceiptService
{
    ReturnReceiptRepository returnReceiptRepository;
    BorrowReceiptRepository borrowReceiptRepository;
    StatusBookRepository statusBookRepository;
    ReturnReceiptMapper returnReceiptMapper;

    @Override
    public ReturnReceiptResponse createReturnReceipt(ReturnReceiptRequest request)
    {
        BorrowReceipt borrowReceipt = borrowReceiptRepository.findByBorrowReceiptId(request.getBorrowReceiptId())
                .orElseThrow(() -> new AppException(ErrorCode.BORROW_ID_NOT_FOUND));

        StatusBook statusBook = statusBookRepository.findById(request.getStatusBookName())
                .orElseThrow(() -> new AppException(ErrorCode.STATUS_NAME_NOT_FOUND));

        ReturnReceipt phieuTra = returnReceiptMapper.toPhieuTra(request);
        phieuTra.setBorrowReceipt(borrowReceipt);
        phieuTra.setStatusBook(statusBook);

        return returnReceiptMapper.toDto(returnReceiptRepository.save(phieuTra));
    }

    @Override
    public List<ReturnReceiptResponse> getAllReturnReceipts()
    {
        return returnReceiptRepository.findAll().stream().map(returnReceiptMapper::toDto).toList();
    }

    @Override
    public ReturnReceiptResponse getByIdReturnReceipt(String id)
    {
        ReturnReceipt returnReceipt = returnReceiptRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));
        return returnReceiptMapper.toDto(returnReceipt);
    }

    @Override
    public ReturnReceiptResponse updateReturnReceipt(String id, ReturnReceiptRequest request)
    {
        ReturnReceipt returnReceipt = returnReceiptRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        BorrowReceipt borrowReceipt = borrowReceiptRepository.findById(request.getBorrowReceiptId())
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        StatusBook statusBook = statusBookRepository.findById(request.getStatusBookName())
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NAME_NOT_FOUND));

        returnReceipt.setReturnDate((Date) request.getReturnDate());
        returnReceipt.setBorrowReceipt(borrowReceipt);
        returnReceipt.setStatusBook(statusBook);

        return returnReceiptMapper.toDto(returnReceiptRepository.save(returnReceipt));
    }

    @Override
    @Transactional
    public void deleteReturnReceipt(String id) {
        ReturnReceipt receipt = returnReceiptRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        // Gỡ liên kết với BorrowReceipt (nếu có)
        if (receipt.getBorrowReceipt() != null) {
            receipt.getBorrowReceipt().setReturnReceipt(null);
        }

        // Gỡ liên kết với StatusBook (nếu cần)
        receipt.setBorrowReceipt(null);
        receipt.setStatusBook(null);

        returnReceiptRepository.delete(receipt);
    }
}
