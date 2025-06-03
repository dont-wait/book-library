package com.nhom678.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "book")
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    int bookId;

    @Column(name = "book_name", nullable = false, unique = true)
    String bookName;

    @Column(name = "description", columnDefinition = "TEXT")
    String description;

    @Column(name = "book_image_url")
    String bookImageURL; //link to image

    @Column(name = "quantity")
    int quantity; //number of book in storage

    @Column(name = "cost")
    Double cost;

    @Column(name = "isbn", nullable = false, unique = true, length = 20)
    String isbn;

    @Column(name = "publication_date")
    Date publicationDate;

    @Column(name="pages")
    Integer pages;

    @Column(name = "rating")
    Double rating;

    @Column(name = "floor_position")
    String floorPosition;

    @ManyToOne
    @JoinColumn(name = "publisher_id", nullable = false)
    Publisher publisher;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    Category category;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    Author author;


}
