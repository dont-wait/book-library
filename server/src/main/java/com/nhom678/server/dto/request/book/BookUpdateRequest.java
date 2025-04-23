package com.nhom678.server.dto.request.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookUpdateRequest {

    @NotBlank(message = "BOOK_NAME_REQUIRED")
    String bookName;

    String description;

    @NotNull(message = "BOOK_IMAGE_URL_REQUIRED")
    byte[] bookImage;

    @NotNull
    @Min(value = 0, message = "QUANTITY_CANNOT_BE_NEGATIVE")
    Integer quantity;

    @NotNull(message = "PUBLICATION_DATE_REQUIRED")
    Date publicationDate;

    @NotBlank(message = "ISBN_REQUIRED")
    String isbn;
}