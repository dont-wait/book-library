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
    @Column(name = "book_id")
    int bookId;

    @Column(name = "book_name", nullable = false)
    String bookName;

    @Column(name = "description")
    String description;

    @Column(name = "book_image_url")
    String bookImageURL; //link to image

    @Column(name = "quantity")
    int quantity; //number of book in storage

    @ManyToOne
    @JoinColumn(name = "publisher_id", nullable = false)
    Publisher publisher;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    Category category;


    @Column(name = "publishcation_date")
    Date publishcationDate;

    @Column(name = "isbn", nullable = false, unique = true, length = 20)
    String isbn;
}
