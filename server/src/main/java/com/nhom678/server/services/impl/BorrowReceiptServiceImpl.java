package com.nhom678.server.services.impl;


import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptCreationRequest;
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
//    Book book;
//    UserAccount userAccount;
//    ReturnReceipt returnReceipt;

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
    public List<BorrowReceiptCreationRequest> getByUserId(String userId){


//        List<BorrowReceipt> list=borrowReceiptRepository.findByUserId(userId);
//        return list.stream()
//                .map(this::toDTO)
//                .collect(Collectors.toList());
        return null;
    }
}
