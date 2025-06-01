package com.nhom678.server.repositories;

import com.nhom678.server.entity.Admin;
import com.nhom678.server.entity.BorrowReceipt;
import com.nhom678.server.entity.ReturnReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BorrowReceiptRepository extends JpaRepository<BorrowReceipt, String> {
    Optional<BorrowReceipt> findByBorrowReceiptId(String borrowReceiptId); //Optional
    Boolean existsByBorrowReceiptId(String borrowReceiptId);
    void deleteByBorrowReceiptId(String borrowReceiptId);

    @Query("SELECT br FROM BorrowReceipt br WHERE br.userAccount.userId = :userId")
    List<BorrowReceipt> findByUserId(@Param("userId") String userId);


}
