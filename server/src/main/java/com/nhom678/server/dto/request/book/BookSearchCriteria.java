package com.nhom678.server.dto.request.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

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

    List<Integer> publisherIds;

    List<Integer> categoryIds;

    List<Integer> authorIds;
}
