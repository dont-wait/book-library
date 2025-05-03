package com.nhom678.server.dto.response;

import com.nhom678.server.entity.Book;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
public class CategoryResponse {
    int categoryId;
    String categoryName;
    List<Book> bookList = new ArrayList<>();
}
