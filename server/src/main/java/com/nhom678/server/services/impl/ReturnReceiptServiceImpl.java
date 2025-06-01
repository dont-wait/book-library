package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.returnReceipt.ReturnReceiptRequest;
import com.nhom678.server.dto.response.ReturnReceiptResponse;
import com.nhom678.server.entity.BorrowReceipt;
import com.nhom678.server.entity.ReturnReceipt;
import com.nhom678.server.entity.StatusBook;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.mapper.ReturnReceiptMapper;
import com.nhom678.server.repositories.BorrowReceiptRepository;
import com.nhom678.server.repositories.ReturnReceiptRepository;
import com.nhom678.server.repositories.StatusBookRepository;
import com.nhom678.server.services.ReturnReceiptService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReturnReceiptServiceImpl implements ReturnReceiptService
{
    ReturnReceiptRepository returnReceiptRepository;
    BorrowReceiptRepository borrowReceiptRepository;
    StatusBookRepository statusBookRepository;
    ReturnReceiptMapper returnReceiptMapper;

    @Autowired
    public ReturnReceiptServiceImpl(BorrowReceiptRepository borrowReceiptRepository) {
        this.borrowReceiptRepository = borrowReceiptRepository;
    }

    @Override
    public ReturnReceiptResponse createReturnReceipt(ReturnReceiptRequest request)
    {
        BorrowReceipt borrowReceipt = borrowReceiptRepository.findByBorrowReceiptId(request.getBorrowReceiptId())
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        StatusBook statusBook = statusBookRepository.findById(request.getStatusBookName())
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NAME_NOT_FOUND));

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
    public void deleteReturnReceipt(String id)
    {
        if (!returnReceiptRepository.existsById(id)) {
            throw new AppException(ErrorCode.ID_NOT_FOUND);
        }
        returnReceiptRepository.deleteById(id);
    }

}
