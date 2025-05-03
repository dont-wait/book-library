package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.request.book.BookUpdateRequest;
import com.nhom678.server.dto.response.BookResponse;
import com.nhom678.server.entity.Book;
import com.nhom678.server.entity.Category;
import com.nhom678.server.entity.Publisher;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BookMapper {

    @Mapping(target = "publisher", source = "publisher")
    @Mapping(target = "category", source = "category")
    Book toBook(BookCreationRequest request, Publisher publisher, Category category);

    @Mapping(target = "publisherId", source = "publisher.publisherId")
    @Mapping(target = "categoryId", source = "category.categoryId")
    BookResponse toBookResponse(Book book);

    void updateBook(@MappingTarget Book book, BookUpdateRequest request);

}
