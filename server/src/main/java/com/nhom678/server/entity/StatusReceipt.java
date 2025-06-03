package com.nhom678.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "status_receipt")
@Builder
public class StatusReceipt {
    @Id
    String statusReceiptName; //Trang thai phieu duoc duyet hay chua
    String statusReceiptDescription;
}
