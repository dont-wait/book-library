package com.nhom678.server.repositories;

import com.nhom678.server.entity.BorrowReceipt;
import com.nhom678.server.entity.ReturnReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReturnReceiptRepository extends JpaRepository<ReturnReceipt, String> {
    Optional<ReturnReceipt> findByReturnReceiptId(String returnReceiptId);
    Boolean existsByReturnReceiptId(String returnReceiptId);
    void deleteByReturnReceiptId(String returnReceiptId);
}
