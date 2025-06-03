package com.nhom678.server.repositories;

import com.nhom678.server.entity.StatusBook;
import com.nhom678.server.entity.StatusReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusReceiptRepository extends JpaRepository<StatusReceipt, String>
{
    StatusReceipt findByStatusReceiptName(String statusReceiptName);
}
