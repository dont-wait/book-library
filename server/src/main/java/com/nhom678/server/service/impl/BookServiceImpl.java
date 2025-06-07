package com.nhom678.server.service.impl;

import com.nhom678.server.dto.request.book.BookCreationRequest;
import com.nhom678.server.dto.request.book.BookSearchCriteria;
import com.nhom678.server.dto.request.book.BookUpdateRequest;
import com.nhom678.server.dto.response.BookResponse;
import com.nhom678.server.entity.*;
import com.nhom678.server.exception.AppException;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.mapper.BookMapper;
import com.nhom678.server.repositories.*;
import com.nhom678.server.service.BookService;
import com.nhom678.server.utils.URLUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    CategoryRepository categoryRepository;
    AuthorRepository authorRepository;
    BorrowReceiptRepository borrowReceiptRepository;
    ReturnReceiptRepository returnReceiptRepository;

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

        Author author = authorRepository.findById(request.getPublisherId())
                .orElseThrow(() -> new AppException(ErrorCode.AUTHOR_NOT_FOUND));



        Book book = bookMapper.toBook(request, publisher, category, author);

        bookRepository.save(book);

        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    @Override
    public List<BookResponse> getAllBooks(int page, int size, Integer categoryId) {
        Pageable pageable = PageRequest.of(page, size);

        List<Book> books;
        if(categoryId != null)
            books = bookRepository.findBookByCategory(pageable, categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_ID_NOT_FOUND))
            );
        else
            books = bookRepository.findAll(pageable).getContent();

        return  books
                .stream()
                .map(bookMapper::toBookResponse)
                .toList();
    }

    @Override
    public BookResponse updateBook(Integer bookId, BookUpdateRequest request) {
        Book bookUpdate = bookRepository.findBookByBookId(bookId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_ID_NOT_FOUND));

        if(request.getAuthorId() != null) {
            Author author = authorRepository.findById(request.getAuthorId())
                    .orElseThrow(() -> new AppException(ErrorCode.AUTHOR_NOT_FOUND));
            bookUpdate.setAuthor(author);
        }

        // Check if publisher exists when publisherId is provided
        if (request.getPublisherId() != null) {
            Publisher publisher = publisherRepository.findById(request.getPublisherId())
                    .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND));
            bookUpdate.setPublisher(publisher);
        }

        // Check if category exists when categoryId is provided
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORYNAME_NOT_FOUND));
            bookUpdate.setCategory(category);
        }

        bookMapper.updateBook(bookUpdate, request);
        bookRepository.save(bookUpdate);

        return bookMapper.toBookResponse(bookUpdate);
    }

    @Override
    @Transactional
    public void deleteBook(Integer bookId) {
        if(borrowReceiptRepository.existsByBook_BookId(bookId)) {
            throw new AppException(ErrorCode.EXISTED_BORROW_RECEIPT_HAVE_BOOKID);
        }
        bookRepository.deleteBookByBookId(bookId);
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
