package com.nhom678.server.dto.response;

import com.nhom678.server.entity.Publisher;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookResponse {
    Integer bookId;

    String bookName;

    String description;

    byte[] bookImage; //blob

    int quantity; //number of book in storage

    Publisher publisher;

    Date publishcationDate;

    String isbn;
}
