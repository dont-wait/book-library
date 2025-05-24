package com.nhom678.server.entity;

import com.nhom678.server.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Admin {
    @Id
    @Column(name = "admin_id", length = 10)
    String adminId;

    @Column(name = "first_name")
    String firstName;

    @Column(name = "last_name")
    String lastName;

    @Column(name = "email", unique = true, length = 50)
    String email;

    @Column(name = "phone", unique = true, length = 11)
    String phone;

    //             ten thuoc tinh trong obj
    //duoc so huu, dc tham chieu
    @OneToOne(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
    UserAccount userAccount;

}
