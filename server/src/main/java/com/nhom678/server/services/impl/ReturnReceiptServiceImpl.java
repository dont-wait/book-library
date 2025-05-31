package com.nhom678.server.services.impl;

import com.nhom678.server.repositories.BorrowReceiptRepository;
import com.nhom678.server.repositories.ReturnReceiptRepository;
import com.nhom678.server.services.ReturnReceiptService;
import jakarta.persistence.FieldResult;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReturnReceiptImpl implements ReturnReceiptService
{
    ReturnReceiptRepository returnReceiptRepository;
    BorrowReceiptRepository borrowReceiptRepository;
    StatusBookRepository
}
