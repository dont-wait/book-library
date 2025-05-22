package com.nhom678.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "librarian")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Librarian {
    @Id
    @Column(name = "librarian_id", length = 10)
    String librarianId;

    @Column(name = "first_name")
    String firstName;

    @Column(name = "last_name")
    String lastName;

    @Column(name = "email", unique = true, length = 50)
    String email;

    @Column(name = "phone", unique = true, length = 11)
    String phone;


    //             ten thuoc tinh trong obj
    @OneToOne(mappedBy = "librarian", cascade = CascadeType.ALL, orphanRemoval = true)
    UserAccount userAccount;
}
