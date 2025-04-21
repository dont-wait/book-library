package com.nhom678.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class Person {
    @Id
    String id;

    @Column(name="FirstName", nullable=false)
    String firstName;

    @Column(name = "LastName", nullable = false)
    String lastName;

    @Email
    @NotBlank(message = "Email is required")
    @Column(name = "Email", unique = true)
    String email;

    @NotBlank(message = "Phone is required")
    @Column(name = "Phone", unique = true)
    String phone;
}
