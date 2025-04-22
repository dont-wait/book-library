package com.nhom678.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.awt.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookId", nullable = false)
    int bookId;

    @Column(name = "BookName", nullable = false)
    String bookName;

    @Column(name = "Description")
    String description;

    @Column(name = "BookImage")
    byte[] bookImage; //blob

    @Column(name = "Quantity")
    int quantity; //number of book in storage

    @ManyToOne
    @JoinColumn(name = "PublisherId", nullable = false)
    Publisher publisher;

    @Column(name = "PublisherDate")
    Date publishcationDate;

    @Column(name = "ISBN", nullable = false, unique = true, length = 20)
    String isbn;

}
