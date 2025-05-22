package com.nhom678.server.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "user_account") // ke nam giu khoa ngoai -> join column
public class UserAccount {
    @Id
    @Column(name = "user_id", length = 10)
    String userId; //=memberId, librarianId, adminId

    @Column(name = "password")
    String password;

    @Column(name = "user_role")
    String role;
    @Column(name = "is_actived")
    Boolean isActived;

    @OneToOne
    @JoinColumn(name = "admin_id")
    Admin admin;

    @OneToOne
    @JoinColumn(name = "librarian_id")
    Librarian librarian;

    @OneToOne
    @JoinColumn(name = "member_id")
    Member member;
}
