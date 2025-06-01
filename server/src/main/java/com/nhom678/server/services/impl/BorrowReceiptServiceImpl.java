package com.nhom678.server.services.impl;


import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptCreationRequest;
import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptUpdateRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;
import com.nhom678.server.entity.*;
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

    @Override
    public BorrowReceiptResponse createBorrowReceipt(BorrowReceiptCreationRequest dto){
//        UserAccount userAccount=userAccountRepository.findByUserId("defaultUserId")
//                .orElseThrow(()-> new AppException(ErrorCode.ID_NOT_FOUND));

        Book book=bookRepository.findById(dto.getBookId())
                .orElseThrow(()-> new AppException(ErrorCode.BOOK_ID_NOT_FOUND));
        //        BorrowReceiptET entity = mapper.toEntity(dto);


        UserAccount userAccount = userAccountRepository.findByUserId(dto.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        StatusBook statusBook = statusBookRepository.findByName(dto.getName())
                .orElseThrow(() -> new AppException(ErrorCode.STATUS_NAME_NOT_FOUND));

        ReturnReceipt returnReceipt = null;
        BorrowReceipt borrowReceipt = BorrowReceipt.builder()
                .borrowDate(dto.getBorrowDate())
                .dueDate(dto.getDueDate())
                .quantity(dto.getQuantity())
                .book(book)
                .userAccount(userAccount)
                .statusBook(statusBook)
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
    public BorrowReceiptResponse updateBorrowReceipt(BorrowReceiptUpdateRequest dto) {
        BorrowReceipt borrowReceipt = borrowReceiptRepository.findById(dto.getBorrowReceiptId())
                .orElseThrow(() -> new AppException(ErrorCode.BORROW_ID_NOT_FOUND));

        if (dto.getBookId() != null) {
            Book book = bookRepository.findById(dto.getBookId())
                    .orElseThrow(() -> new AppException(ErrorCode.BOOK_ID_NOT_FOUND));
            borrowReceipt.setBook(book);
        }

        if (dto.getStatusName() != null) {
            StatusBook statusBook = statusBookRepository.findByName(dto.getStatusName())
                    .orElseThrow(() -> new AppException(ErrorCode.STATUS_NAME_NOT_FOUND));
            borrowReceipt.setStatusBook(statusBook);
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
