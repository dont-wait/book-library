package com.nhom678.server.repositories;

import com.nhom678.server.entity.StatusBook;
import com.nhom678.server.entity.StatusReceipt;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusReceiptRepository {
    StatusReceipt findByStatusReceiptName(String statusReceiptName);
}
