package com.nhom678.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Student")
@Data
public class Student{
    @Id
    String studentId;

    @Column(name="FirstName", nullable = false)
    String firstName;

    @Column(name = "LastName", nullable = false)
    String lastName;

    @Email
    @NotBlank(message = "Email is required")
    @Column(name= "Email" , unique = true, nullable = false)
    String email;

    @NotBlank(message = "Phone is required")
    @Column(name = "Phone", unique = true)
    String phone;

    @Column(name = "ClassId", nullable = false)
    String classId;
}
