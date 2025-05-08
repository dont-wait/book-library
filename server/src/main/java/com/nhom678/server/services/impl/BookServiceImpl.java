package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.request.book.BookSearchCriteria;
import com.nhom678.server.dto.request.book.BookUpdateRequest;
import com.nhom678.server.dto.response.BookResponse;
import com.nhom678.server.entity.*;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.exceptions.ErrorCode;
import com.nhom678.server.mapper.BookMapper;
import com.nhom678.server.repositories.*;
import com.nhom678.server.services.BookService;
import com.nhom678.server.utils.URLUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookServiceImpl implements BookService {

    BookRepository bookRepository;
    BookMapper bookMapper;
    PublisherRepository publisherRepository;
    private final CategoryRepository categoryRepository;
    private final AuthorRepository authorRepository;
    private final BookAuthorRepository bookAuthorRepository;

    @Override
    @Transactional
    public BookResponse createBook(BookCreationRequest request) {

        if(request.getBookImageURL() == null || !URLUtils.isValidUrl(request.getBookImageURL()))
            throw new AppException(ErrorCode.INVALID_FORMAT_IMAGE_URL);

        if(bookRepository.existsBookByIsbn(request.getIsbn()))
            throw new AppException(ErrorCode.ISBN_EXISTED);

        if(bookRepository.existsBookByBookName(request.getBookName()))
            throw new AppException(ErrorCode.BOOK_NAME_EXISTED);

        Publisher publisher = publisherRepository.findById(request.getPublisherId())
                .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORYNAME_NOT_FOUND));

        List<Author> authors = authorRepository.findAllById(request.getAuthorIds());
        if (authors.size() != request.getAuthorIds().size()) {
            throw new AppException(ErrorCode.AUTHOR_NOT_FOUND);
        }

        Book book = bookMapper.toBook(request, publisher, category);

        List<BookAuthor> bookAuthors = authors.stream().map(author -> {
            BookAuthor ba = new BookAuthor();
            ba.setAuthor(author);
            ba.setBook(book);
            return ba;
        }).toList();

        //After save, we will response for client
        bookAuthorRepository.saveAll(bookAuthors);
        book.setBookAuthors(bookAuthors);
        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    @Override
    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(bookMapper::toBookResponse)
                .toList();
    }

    @Override
    public BookResponse updateBook(Integer bookId, BookUpdateRequest request) {
        Book bookUpdate = bookRepository.findBookByBookId(bookId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_ID_NOT_FOUND));

        bookMapper.updateBook(bookUpdate, request);

        return bookMapper.toBookResponse(bookUpdate);
    }

    @Override
    @Transactional
    public void deleteBook(String bookName) {
        bookRepository.deleteBookByBookName(bookName);
    }

    @Override
    public List<BookResponse> searchBooks(BookSearchCriteria criteria) {
        Specification<Book> spec = BookSpecification.buildSpecification(criteria);
        return bookRepository.findAll(spec)
                .stream()
                .map(bookMapper::toBookResponse)
                .collect(Collectors.toList());
    }


}
