package com.nhom678.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "borrow_receipt")
@Builder
public class BorrowReceipt {
    @Id
    @Column(name = "borrow_receipt_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    String borrowReceiptId;


    @Column(name="borrow_date", nullable = false)
    LocalDate borrowDate;

    @Column(name="due_date", nullable = false)
    LocalDate dueDate;

    @Column(name="quantity", nullable = false)
    Integer quantity;

    @ManyToOne
    @JoinColumn(name = "book_id")
    Book book;

    @ManyToOne
    @JoinColumn(name = "user_id")
    UserAccount userAccount;

    @ManyToOne
    @JoinColumn(name = "name")
    StatusBook statusBook;

    @OneToOne(mappedBy = "borrowReceipt")
    ReturnReceipt returnReceipt;


    @ManyToOne
    @JoinColumn (name = "status_receipt_name")
    StatusReceipt statusReceipt;

    @Column(name = "cost_borrow")
    Double costBorrow;



}
