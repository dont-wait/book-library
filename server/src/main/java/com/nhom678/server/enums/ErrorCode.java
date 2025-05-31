package com.nhom678.server.enums;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
@AllArgsConstructor
public enum ErrorCode {
    INVALID_ID_KEY(1001, "Invalid Message key, you should check your key", HttpStatus.BAD_REQUEST), //Sai sot trong dat viec dat Message tai DTO
    PHONE_EXISTED(1002, "Your input phone number is existed", HttpStatus.CONFLICT),
    EMAIL_EXISTED(1002, "Your input email is existed", HttpStatus.CONFLICT),
    ISBN_EXISTED(1002, "ISBN already existed", HttpStatus.CONFLICT),
    PUBLISHERNAME_EXISTED(1002, "Publisher Name already existed", HttpStatus.CONFLICT),
    CATEGORYNAME_EXISTED(1002, "Category Name already existed", HttpStatus.CONFLICT),
    AUTHOR_NAME_EXISTED(1002, "Author Name already existed", HttpStatus.CONFLICT),
    BOOK_NAME_EXISTED(1002, "Book Name already existed", HttpStatus.CONFLICT),
    ID_EXISTED(1002, "Id already existed", HttpStatus.CONFLICT),

    CATEGORYNAME_NOT_FOUND(1003, "Category Name not found", HttpStatus.NOT_FOUND),
    CATEGORYID_NOT_FOUND(1003, "Category Id not found", HttpStatus.NOT_FOUND),
    AUTHOR_NOT_FOUND(1003, "Author id not found", HttpStatus.NOT_FOUND),
    ISBN_NOT_FOUND(1003, "ISBN not found", HttpStatus.NOT_FOUND),
    BOOK_ID_NOT_FOUND(1003, "Book id not found", HttpStatus.NOT_FOUND),
    BOOK_NAME_NOT_FOUND(1003, "Book name not found", HttpStatus.NOT_FOUND),
    BOOK_NOT_FOUND(1003, "Searched by Book name, ISBN - BOOK NOT FOUND", HttpStatus.NOT_FOUND),
    PUBLISHER_NOT_FOUND(1003, "Publisher name not found", HttpStatus.NOT_FOUND),
    ID_NOT_FOUND(1003, "Person not found", HttpStatus.NOT_FOUND),
    STATUS_NAME_NOT_FOUND(1003, "Status name not found", HttpStatus.NOT_FOUND),

    BOOK_IMAGE_URL_REQUIRED(1004, "Book image url is required", HttpStatus.BAD_REQUEST),
    AUTHOR_IDS_REQUIRED(1004, "Author ids is required", HttpStatus.BAD_REQUEST),
    AT_LEAST_ONE_AUTHOR_REQUIRED(1004, "At least one author is required", HttpStatus.BAD_REQUEST),
    BOOK_NAME_REQUIRED(1004, "Book name is required", HttpStatus.BAD_REQUEST),
    AUTHOR_NAME_REQUIRE(1004, "Author name is required", HttpStatus.BAD_REQUEST),
    PUBLICATION_DATE_REQUIRED(1004, "Publication date is required", HttpStatus.BAD_REQUEST),
    ISBN_REQUIRED(1004, "ISBN is required", HttpStatus.BAD_REQUEST),
    CATEGORY_REQUIRED(1004, "Category is required", HttpStatus.BAD_REQUEST),
    EMAIL_REQUIRED(1004, "Email is required", HttpStatus.BAD_REQUEST),
    PHONE_REQUIRED(1004, "Phone is required", HttpStatus.BAD_REQUEST),

    BOOK_NAME_TOO_SHORT(1006, "Book name must be at least 5 characters long", HttpStatus.BAD_REQUEST),
    ID_MUST_BE_10_CHARACTERS(1006, "Id must be 10 characters long", HttpStatus.BAD_REQUEST),
    QUANTITY_CANNOT_BE_NEGATIVE(1006, "Quantity cannot be negative", HttpStatus.BAD_REQUEST),
    PHONE_MUST_BE_OR_10_11_CHARACTERS(1006, "Phone must be 10 or 11 characters long", HttpStatus.BAD_REQUEST),
    PASSWORD_MUST_BE_INCLUDE_SPECIFY_CHARACTER(1006, "Password must be include specify character", HttpStatus.BAD_REQUEST),
    INVALID_FORMAT_IMAGE_URL(1006, "Invalid format image url", HttpStatus.BAD_REQUEST),
    INVALID_FORMAT_EMAIL(1006, "Invalide email format", HttpStatus.BAD_REQUEST),
    ROLE_MUST_BE_STUDENT_OR_LECTURER(1006, "Role must be student or lecturer", HttpStatus.BAD_REQUEST),

    UNAUTHENTICATED(1007, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not permission", HttpStatus.FORBIDDEN),

    UNCATEGORIZED(6789, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR);
    private final int code;
    private final String message;
    private final HttpStatus status;
    
    public int getStatus() {
        return status.value();
    }
}
