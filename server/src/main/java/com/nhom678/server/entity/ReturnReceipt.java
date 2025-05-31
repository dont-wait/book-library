package com.nhom678.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "return_receipt")
public class ReturnReceipt {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String returnReceiptId;

    @Column(name = "return_receipt")
    Date returnDate;

    @ManyToOne
    @JoinColumn(name = "name")
    StatusBook statusBook;

    @OneToOne
    @JoinColumn(name = "borrow_receipt_id", unique = true)
    BorrowReceipt borrowReceipt;

}
