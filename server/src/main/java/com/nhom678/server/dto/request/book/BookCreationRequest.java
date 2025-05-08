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

    @NotNull(message = "BOOK_IMAGE_URL_REQUIRED")
    String bookImageURL;

    @Min(value = 0, message = "QUANTITY_CANNOT_BE_NEGATIVE")
    int quantity;

    @NotBlank(message = "ISBN_REQUIRED")
    String isbn;

    Date publicationDate;

    Double rating;

    String floorPosition;

    @NotNull(message = "PUBLISHER_REQUIRED")
    Integer publisherId;

    @NotNull(message = "CATEGORY_REQUIRED")
    Integer categoryId;

    @NotNull(message = "AUTHOR_IDS_REQUIRED")
    @Size(min = 1, message = "AT_LEAST_ONE_AUTHOR_REQUIRED")
    List<Integer> authorIds;

}
