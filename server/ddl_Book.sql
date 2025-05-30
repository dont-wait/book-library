CREATE TABLE book
(
    book_id          INT AUTO_INCREMENT NOT NULL,
    book_name        VARCHAR(255)       NOT NULL,
    `description`    VARCHAR(255)       NULL,
    book_image_url   VARCHAR(255)       NULL,
    quantity         INT                NULL,
    cost             DOUBLE             NULL,
    isbn             VARCHAR(20)        NOT NULL,
    publication_date datetime           NULL,
    pages            INT                NULL,
    rating           DOUBLE             NULL,
    floor_position   VARCHAR(255)       NULL,
    publisher_id     INT                NOT NULL,
    category_id      INT                NOT NULL,
    author_id        INT                NOT NULL,
    CONSTRAINT pk_book PRIMARY KEY (book_id)
);

ALTER TABLE book
    ADD CONSTRAINT uc_book_book_name UNIQUE (book_name);

ALTER TABLE book
    ADD CONSTRAINT uc_book_isbn UNIQUE (isbn);

ALTER TABLE book
    ADD CONSTRAINT FK_BOOK_ON_AUTHOR FOREIGN KEY (author_id) REFERENCES author (author_id);

ALTER TABLE book
    ADD CONSTRAINT FK_BOOK_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES category (category_id);

ALTER TABLE book
    ADD CONSTRAINT FK_BOOK_ON_PUBLISHER FOREIGN KEY (publisher_id) REFERENCES publisher (publisher_id);