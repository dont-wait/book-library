package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.request.book.BookUpdateRequest;
import com.nhom678.server.dto.response.BookResponse;
import com.nhom678.server.entity.Book;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BookMapper {
    Book toBook(BookCreationRequest request, int publisherId);
    BookResponse toBookResponse(Book book);
    void updateBook(@MappingTarget Book book, BookUpdateRequest request);

}
