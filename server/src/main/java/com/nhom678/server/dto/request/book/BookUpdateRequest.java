package com.nhom678.server.dto.request.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class BookUpdateRequest {

    Double cost;

    String description;

    String bookImageURL;

    @Min(value = 0, message = "QUANTITY_CANNOT_BE_NEGATIVE")
    int quantity;


    Date publicationDate;

    Double rating;

    String floorPosition;

    Integer authorId;

    Integer publisherId;

    Integer categoryId;
}