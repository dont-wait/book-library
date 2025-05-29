package com.nhom678.server.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "status_book")
public class StatusBook {
    @Id
    String name;

    @Column(name = "fine_code", nullable = false)
    Double fineCode;

    @Column(name = "description")
    String description;

    @OneToMany(mappedBy = "statusBook", cascade = CascadeType.ALL, orphanRemoval = true)
    List<BorrowReceipt> borrowReceipt;
}
