package com.nhom678.server.dto.request.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookSearchCriteria {
    String bookName;

    //Double cost;

    String isbn;

    Date publicationDate;

    Double rating;

    String floorPosition;

    Integer publisherId;

    Integer categoryId;

    //Integer authorId;
}
