package com.nhom678.server.dto.response;

import com.nhom678.server.entity.Publisher;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class BookResponse {
    Integer bookId;

    String bookName;

    Double cost;

    String description;

    String bookImageURL;

    int quantity;

    String isbn;

    Date publicationDate;

    Double rating;

    String floorPosition;

    Integer publisherId;

    Integer categoryId;
}
