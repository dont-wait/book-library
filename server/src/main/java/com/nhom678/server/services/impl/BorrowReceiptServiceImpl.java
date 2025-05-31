package com.nhom678.server.services.impl;


import com.nhom678.server.dto.request.BorrowReceipt.BorrowReceiptRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;
import com.nhom678.server.entity.Book;
import com.nhom678.server.entity.BorrowReceipt;
import com.nhom678.server.entity.StatusBook;
import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.mapper.BorrowReceiptMapper;
import com.nhom678.server.repositories.BookRepository;
import com.nhom678.server.repositories.BorrowReceiptRepository;
import com.nhom678.server.repositories.StatusBookRepository;
import com.nhom678.server.repositories.UserAccountRepository;
import com.nhom678.server.services.BorrowReceiptService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BorrowReceiptServiceImpl implements BorrowReceiptService
{
    BorrowReceiptRepository borrowReceiptRepository;
    BookRepository bookRepository;
    UserAccountRepository userAccountRepository;
    StatusBookRepository statusBookRepository;
    BorrowReceiptMapper borrowReceiptMapper;

    @Override
    public BorrowReceiptResponse createBorerowReceipt(BorrowReceiptRequest request)
    {
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NAME_NOT_FOUND));

        UserAccount userAccount = userAccountRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        StatusBook statusBook = statusBookRepository.findById(request.getStatusBookName())
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NAME_NOT_FOUND));

        BorrowReceipt borrowReceipt = borrowReceiptRepository.findByBorrowReceiptId((request.getBorrowReceiptId()))
                        .orElseThrow(() -> new AppException(ErrorCode.BORROW_ID_NOT_FOUND));

        borrowReceipt = BorrowReceipt.builder()
                .book(book)
                .
                .build();

        borrowReceipt.setBook(book);
        borrowReceipt.setUserAccount(userAccount);
        borrowReceipt.setStatusBook(statusBook);


        return borrowReceiptMapper.toDto(borrowReceiptRepository.save(borrowReceipt));
    }

    @Override
    public List<BorrowReceiptResponse> getAllBorrowReceipt()
    {
        return borrowReceiptRepository.findAll().stream().map(borrowReceiptMapper::toDto).toList();
    }

    @Override
    public BorrowReceiptResponse getByIdBorrowReceipt(String id)
    {
        BorrowReceipt borrowReceipt = borrowReceiptRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));
        return borrowReceiptMapper.toDto(borrowReceipt);
    }

    @Override
    public BorrowReceiptResponse updateBorrowReceipt(String id, BorrowReceiptRequest request)
    {
        BorrowReceipt borrowReceipt = borrowReceiptRepository.findByBorrowReceiptId(id)
                .orElseThrow(() -> new AppException(ErrorCode.BORROW_ID_NOT_FOUND));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_ID_NOT_FOUND));

        UserAccount userAccount = userAccountRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        StatusBook statusBook = statusBookRepository.findById(request.getStatusBookName())
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NAME_NOT_FOUND));

        borrowReceipt.setBorrowDate(request.getBorrowDate());
        borrowReceipt.setDueDate(request.getDueDate());
        borrowReceipt.setQuantity(request.getQuantity());
        borrowReceipt.setBook(book);
        borrowReceipt.setUserAccount(userAccount);
        borrowReceipt.setStatusBook(statusBook);

        return borrowReceiptMapper.toDto(borrowReceiptRepository.save(borrowReceipt));

    }

    @Override
    public void deleteBorrowReceipt(String id)
    {
        if (!borrowReceiptRepository.existsById(id)) {
            throw new AppException(ErrorCode.ID_NOT_FOUND);
        }
        borrowReceiptRepository.deleteById(id);

    }
}
