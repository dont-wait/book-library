package com.nhom678.server.services.impl;


import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptCreationRequest;
import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptUpdateRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;
import com.nhom678.server.entity.*;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.mapper.BorrowReceiptMapper;
import com.nhom678.server.repositories.*;
import com.nhom678.server.services.BorrowReceiptService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class BorrowReceiptServiceImpl implements BorrowReceiptService {

    BorrowReceiptRepository borrowReceiptRepository;
    BorrowReceiptMapper mapper;
    UserAccountRepository userAccountRepository;
    BookRepository bookRepository;
    StatusBookRepository statusBookRepository;
    StatusReceiptRepository statusReceiptRepository;


    @Override
    public BorrowReceiptResponse createBorrowReceipt(BorrowReceiptCreationRequest dto){
        // Validate thời gian
        LocalDate borrowDate = dto.getBorrowDate();
        LocalDate dueDate = dto.getDueDate();


        Book book=bookRepository.findById(dto.getBookId())
                .orElseThrow(()-> new AppException(ErrorCode.BOOK_ID_NOT_FOUND));

        if (borrowDate.isAfter(dueDate) ||
                ChronoUnit.DAYS.between(borrowDate, dueDate) > 10 ||
                borrowDate.isBefore(LocalDate.of(2020, 1, 1)))
            throw new AppException(ErrorCode.INVALID_BORROW_DATE);

        if(dto.getQuantity() > 5)
            throw new AppException(ErrorCode.QUANTITY_CANNOT_GREATER_THAN_FIVE);

        UserAccount userAccount = userAccountRepository.findByUserId(dto.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        StatusBook statusBook = statusBookRepository.findByName(dto.getName())
                .orElseThrow(() -> new AppException(ErrorCode.STATUS_NAME_NOT_FOUND));

        StatusReceipt statusReceipt = statusReceiptRepository.findById(dto.getStatusReceiptName())
                .orElseThrow(() -> new AppException(ErrorCode.STATUS_RECEIPT_NOT_FOUND));

        Double costBorrow = statusBook.getFinePercent() * book.getCost() * dto.getQuantity();

        // Tru so luong trong kho con lai
        book.setQuantity(book.getQuantity() - dto.getQuantity());
        bookRepository.save(book);

        BorrowReceipt borrowReceipt = BorrowReceipt.builder()
                .borrowDate(dto.getBorrowDate())
                .dueDate(dto.getDueDate())
                .quantity(dto.getQuantity())
                .book(book)
                .userAccount(userAccount)
                .statusBook(statusBook)
                .statusReceipt(statusReceipt)
                .costBorrow(costBorrow)
                .build();
        borrowReceiptRepository.save(borrowReceipt);
        return mapper.toBorrowReceiptResponse(borrowReceipt);
    }


    @Override
    public List<BorrowReceiptResponse> getAll(){
        List<BorrowReceipt> list= borrowReceiptRepository.findAll();
        return list.stream()
                .map(mapper::toBorrowReceiptResponse)
                .collect(Collectors.toList());
    }
    @Override
    public List<BorrowReceiptResponse> getByUserId(String userId){


        List<BorrowReceipt> list=borrowReceiptRepository.findByUserId(userId);
        return list.stream()
                .map(mapper::toBorrowReceiptResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BorrowReceiptResponse updateBorrowReceipt(String borrowReceiptId, BorrowReceiptUpdateRequest dto) {
        BorrowReceipt borrowReceipt = borrowReceiptRepository.findById(borrowReceiptId)
                .orElseThrow(() -> new AppException(ErrorCode.BORROW_ID_NOT_FOUND));



        if (dto.getStatusName() != null) {
            StatusBook statusBook = statusBookRepository.findByName(dto.getStatusName())
                    .orElseThrow(() -> new AppException(ErrorCode.STATUS_NAME_NOT_FOUND));
            borrowReceipt.setStatusBook(statusBook);
        }

        if (dto.getStatusReceiptName() != null) {
            StatusReceipt statusReceipt = statusReceiptRepository.findById(dto.getStatusReceiptName())
                    .orElseThrow(() -> new AppException(ErrorCode.STATUS_RECEIPT_NOT_FOUND));
            borrowReceipt.setStatusReceipt(statusReceipt);
        }


        // trường  còn lại
        mapper.updateBorrowReceipt(borrowReceipt, dto);

        borrowReceiptRepository.save(borrowReceipt);

        return mapper.toBorrowReceiptResponse(borrowReceipt);
    }

    @Override
    public void deleteBorrowReceipt(String borrowReceiptId) {
        BorrowReceipt borrowReceipt = borrowReceiptRepository.findById(borrowReceiptId)
                .orElseThrow(() -> new AppException(ErrorCode.BORROW_ID_NOT_FOUND));
        borrowReceiptRepository.delete(borrowReceipt);
    }

}
