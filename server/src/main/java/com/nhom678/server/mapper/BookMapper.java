package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.request.book.BookUpdateRequest;
import com.nhom678.server.dto.response.BookResponse;
import com.nhom678.server.entity.Author;
import com.nhom678.server.entity.Book;
import com.nhom678.server.entity.Category;
import com.nhom678.server.entity.Publisher;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookMapper {


    Book toBook(BookCreationRequest request, Publisher publisher, Category category, Author author);

    @Mapping(target = "publisherName", source = "publisher.publisherName")
    @Mapping(target = "categoryName", source = "category.categoryName")
    @Mapping(target = "authorName", source = "author.authorName")
    BookResponse toBookResponse(Book book);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateBook(@MappingTarget Book book, BookUpdateRequest request);
}
