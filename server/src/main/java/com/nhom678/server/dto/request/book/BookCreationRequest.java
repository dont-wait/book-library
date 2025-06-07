package com.nhom678.server.dto.request.book;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookCreationRequest {

    @NotBlank(message = "BOOK_NAME_REQUIRED")
    @Size(min = 5, message = "BOOK_NAME_TOO_SHORT")
    String bookName;

    Double cost;

    String description;

    String bookImageURL;

    @Min(value = 0, message = "QUANTITY_CANNOT_BE_NEGATIVE")
    int quantity;

    @NotBlank(message = "ISBN_REQUIRED")
    String isbn;

    Date publicationDate;

    Integer pages;

    Double rating;

    String floorPosition;

    @NotNull(message = "Publisher can not null")
    Integer publisherId;

    @NotNull(message = "category can not null")
    Integer categoryId;

    @NotNull(message = "Author can not null")
    Integer authorId;

}
