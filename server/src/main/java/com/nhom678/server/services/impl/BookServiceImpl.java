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
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.ArrayList;
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

        if(bookRepository.existsBookByBookName(request.getBookName()))
            throw new AppException(ErrorCode.BOOK_NAME_EXISTED);

        Publisher publisher = publisherRepository.findById(request.getPublisherId())
                .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORYNAME_NOT_FOUND));

        Book book = bookMapper.toBook(request, publisher, category);


        //After save, we will response for client
        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    @Override
    public List<BookResponse> searchBookByISBNAndBookName(String isbn, String bookName) {
        List<Book> list = new ArrayList<>();

        Boolean hasIsbn = isbn != null && !isbn.isBlank();
        Boolean hasBookName = bookName != null && !bookName.isBlank();
        
        if(!hasIsbn && !hasBookName)
            throw new AppException(ErrorCode.BOOK_NOT_FOUND);
        
        if(hasIsbn)
            bookRepository.findBookByIsbn(isbn).ifPresent(list::add);
        if(hasBookName)
            bookRepository.findBookByBookName(bookName).ifPresent(list::add);
        
        if(list.isEmpty())
            throw new AppException(ErrorCode.BOOK_NOT_FOUND);
        
        return list.stream()
                .map(bookMapper::toBookResponse)
                .toList();
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
    public List<BookResponse> getBooksHaveCategoryId(Integer categoryId) {
        List<Book> listBook = new ArrayList<>();
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORYID_NOT_FOUND));
        for (Book book : bookRepository.findAll()) {
            if(book.getCategory().getCategoryId().equals(categoryId))
                listBook.add(book);
        }
        return listBook.stream()
                .map(bookMapper::toBookResponse)
                .toList();
    }
}
