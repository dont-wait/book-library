package com.nhom678.server.dto.request.book;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;

public class BookCreationRequest {

    @NotBlank(message = "BOOK_NAME_REQUIRED")
    @Size(min = 1, message = "BOOK_NAME_TOO_SHORT")
    private String bookName;

    private String description;

    @NotNull(message = "BOOK_IMAGE_REQUIRED")
    private byte[] bookImage;

    @Min(value = 0, message = "QUANTITY_CANNOT_BE_NEGATIVE")
    private int quantity;

    @NotNull(message = "PUBLISHER_REQUIRED")
    private Long publisherId;

    private Date publicationDate;

    @NotBlank(message = "ISBN_REQUIRED")
    private String isbn;
}