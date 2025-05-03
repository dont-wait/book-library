package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.request.book.BookUpdateRequest;
import com.nhom678.server.dto.response.BookResponse;
import com.nhom678.server.entity.Book;
import com.nhom678.server.entity.Category;
import com.nhom678.server.entity.Publisher;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.exceptions.ErrorCode;
import com.nhom678.server.mapper.BookMapper;
import com.nhom678.server.repositories.BookRepository;
import com.nhom678.server.repositories.CategoryRepository;
import com.nhom678.server.repositories.PublisherRepository;
import com.nhom678.server.services.BookService;
import com.nhom678.server.utils.URLUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookServiceImpl implements BookService {

    BookRepository bookRepository;
    BookMapper bookMapper;
    PublisherRepository publisherRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public BookResponse createBook(BookCreationRequest request) {

        if(request.getBookImageURL() == null || !URLUtils.isValidUrl(request.getBookImageURL()))
            throw new AppException(ErrorCode.INVALID_FORMAT_IMAGE_URL);

        if(bookRepository.existsBookByIsbn(request.getIsbn()))
            throw new AppException(ErrorCode.ISBN_EXISTED);

        Publisher publisher = publisherRepository.findById(request.getPublisherId())
                .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORYNAME_NOT_FOUND));

        Book book = bookMapper.toBook(request, publisher, category);


        //After save, we will response for client
        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    @Override
    public BookResponse getBook(String isbn, String bookName) {
        Book book = null;
        if(isbn != null || !isbn.isEmpty())
            book = bookRepository.findBookByIsbn(isbn)
                    .orElseThrow(() -> new AppException(ErrorCode.ISBN_NOT_FOUND));
        if(bookName != null || !bookName.isEmpty())
            book = bookRepository.findBookByBookName(bookName)
                    .orElseThrow(() -> new AppException(ErrorCode.BOOK_NAME_NOT_FOUND));
        else
            throw new AppException(ErrorCode.BOOK_NOT_FOUND);
        return bookMapper.toBookResponse(book);
    }

    @Override
    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(bookMapper::toBookResponse)
                .toList();
    }

    @Override
    public BookResponse updateBook(String bookName, BookUpdateRequest request) {
        return null;
    }

    @Override
    public void deleteBook(String bookName) {
        bookRepository.deleteBookByBookName(bookName);
    }
}
