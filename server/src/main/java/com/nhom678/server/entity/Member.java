package com.nhom678.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @Column(name = "member_id", length = 10)
    String memberId;

    @Column(name = "first_name")
    String firstName;

    @Column(name = "last_name")
    String lastName;

    @Column(name = "email", unique = true, length = 50)
    String email;

    @Column(name = "phone", unique = true, length = 11)
    String phone;

    //             ten thuoc tinh trong obj
    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    UserAccount userAccount;
}
