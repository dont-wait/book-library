-- Bảng vai trò
CREATE TABLE role (
                      role_id INT(10) NOT NULL AUTO_INCREMENT,
                      role_name VARCHAR(255) NOT NULL,
                      PRIMARY KEY (role_id)
) ENGINE=InnoDB;

-- Bảng tác giả
CREATE TABLE author (
                        author_id INT(10) NOT NULL AUTO_INCREMENT,
                        author_name VARCHAR(255) NOT NULL,
                        bio VARCHAR(255),
                        PRIMARY KEY (author_id)
) ENGINE=InnoDB;

-- Trạng thái sách
CREATE TABLE status_book (
                             status_book_id INT(10) NOT NULL AUTO_INCREMENT,
                             status_book_name VARCHAR(255) NOT NULL UNIQUE,
                             PRIMARY KEY (status_book_id)
) ENGINE=InnoDB;

-- Trạng thái phiếu mượn/trả
CREATE TABLE status_receipt (
                                status_receipt_id INT(10) NOT NULL AUTO_INCREMENT,
                                status_receipt_id_name VARCHAR(255) NOT NULL UNIQUE,
                                PRIMARY KEY (status_receipt_id)
) ENGINE=InnoDB;

-- Nhà xuất bản
CREATE TABLE publisher (
                           publisher_id INT(10) NOT NULL AUTO_INCREMENT,
                           publisher_name VARCHAR(255) NOT NULL UNIQUE,
                           PRIMARY KEY (publisher_id)
) ENGINE=InnoDB;

-- Thể loại sách
CREATE TABLE category (
                          category_id INT(10) NOT NULL AUTO_INCREMENT,
                          category_name VARCHAR(255) NOT NULL UNIQUE,
                          PRIMARY KEY (category_id)
) ENGINE=InnoDB;

-- Sách
CREATE TABLE book (
                      book_id INT(10) NOT NULL AUTO_INCREMENT,
                      book_name VARCHAR(255) NOT NULL,
                      description VARCHAR(255),
                      book_image TEXT,
                      quantity INT(10),
                      cost DECIMAL(19, 0) NOT NULL,
                      isbn CHAR(20) NOT NULL UNIQUE,
                      publishcation_date DATE,
                      category_id INT(10) NOT NULL,
                      publisher_id INT(10) NOT NULL,
                      position INT(11),
                      PRIMARY KEY (book_id),
                      FOREIGN KEY (category_id) REFERENCES category(category_id)
                          ON UPDATE CASCADE ON DELETE CASCADE,
                      FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id)
                          ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Liên kết sách - tác giả
CREATE TABLE book_author (
                             author_id INT(10) NOT NULL,
                             book_id INT(10) NOT NULL,
                             PRIMARY KEY (author_id, book_id),
                             FOREIGN KEY (author_id) REFERENCES author(author_id)
                                 ON UPDATE CASCADE ON DELETE CASCADE,
                             FOREIGN KEY (book_id) REFERENCES book(book_id)
                                 ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Thủ thư
CREATE TABLE librarian (
                           librarian_id CHAR(11) NOT NULL,
                           first_name VARCHAR(30) NOT NULL,
                           last_name VARCHAR(50) NOT NULL,
                           librarian_contact CHAR(11) NOT NULL UNIQUE,
                           librarian_position VARCHAR(50) NOT NULL,
                           PRIMARY KEY (librarian_id)
) ENGINE=InnoDB;

-- Tài khoản người dùng
CREATE TABLE user_account (
                              user_id CHAR(11) NOT NULL,
                              password VARCHAR(255) NOT NULL,
                              role_id INT(10) NOT NULL,
                              status INT(11) DEFAULT 1,
                              PRIMARY KEY (user_id),
                              FOREIGN KEY (role_id) REFERENCES role(role_id)
                                  ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Thành viên
CREATE TABLE member (
                        member_id CHAR(11) NOT NULL,
                        first_name VARCHAR(30) NOT NULL,
                        last_name VARCHAR(50) NOT NULL,
                        member_genre INT(11) NOT NULL,
                        member_contact CHAR(11) NOT NULL UNIQUE,
                        PRIMARY KEY (member_id),
                        FOREIGN KEY (member_id) REFERENCES user_account(user_id)
                            ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Phiếu mượn
CREATE TABLE borrow_receipt_tbl (
                                    borrow_receipt_id INT(11) NOT NULL AUTO_INCREMENT,
                                    borrow_date DATE NOT NULL,
                                    return_date DATE,
                                    status_id INT(10) NOT NULL,
                                    user_id CHAR(11) NOT NULL,
                                    librarian_id CHAR(11) NOT NULL,
                                    PRIMARY KEY (borrow_receipt_id),
                                    FOREIGN KEY (status_id) REFERENCES status_receipt(status_receipt_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE,
                                    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE,
                                    FOREIGN KEY (librarian_id) REFERENCES librarian(librarian_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Chi tiết phiếu mượn
CREATE TABLE borrow_receipt_detail (
                                       borrow_receipt_detail_id INT(11) NOT NULL AUTO_INCREMENT,
                                       due_date DATE NOT NULL,
                                       status_book_id INT(10) NOT NULL,
                                       book_id INT(10) NOT NULL,
                                       receipt_id INT(11) NOT NULL,
                                       PRIMARY KEY (borrow_receipt_detail_id),
                                       FOREIGN KEY (status_book_id) REFERENCES status_book(status_book_id)
                                           ON UPDATE CASCADE ON DELETE CASCADE,
                                       FOREIGN KEY (book_id) REFERENCES book(book_id)
                                           ON UPDATE CASCADE ON DELETE CASCADE,
                                       FOREIGN KEY (receipt_id) REFERENCES borrow_receipt_tbl(borrow_receipt_id)
                                           ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Phiếu trả
CREATE TABLE return_receipt_tbl (
                                    return_receipt_id INT(11) NOT NULL AUTO_INCREMENT,
                                    borrow_receipt_id INT(11) NOT NULL,
                                    librarian_id CHAR(11) NOT NULL,
                                    return_date DATE NOT NULL,
                                    note VARCHAR(255),
                                    PRIMARY KEY (return_receipt_id),
                                    FOREIGN KEY (borrow_receipt_id) REFERENCES borrow_receipt_tbl(borrow_receipt_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE,
                                    FOREIGN KEY (librarian_id) REFERENCES librarian(librarian_id)
                                        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Chi tiết phiếu trả
CREATE TABLE return_receipt_detail (
                                       return_receipt_detail_id INT(11) NOT NULL AUTO_INCREMENT,
                                       status_book_id INT(10) NOT NULL,
                                       borrow_receipt_detail_id INT(11) NOT NULL,
                                       return_receipt_id INT(11) NOT NULL,
                                       fine_cost DECIMAL(19, 0),
                                       reason_fine VARCHAR(255),
                                       PRIMARY KEY (return_receipt_detail_id),
                                       FOREIGN KEY (status_book_id) REFERENCES status_book(status_book_id)
                                           ON UPDATE CASCADE ON DELETE CASCADE,
                                       FOREIGN KEY (borrow_receipt_detail_id) REFERENCES borrow_receipt_detail(borrow_receipt_detail_id)
                                           ON UPDATE CASCADE ON DELETE CASCADE,
                                       FOREIGN KEY (return_receipt_id) REFERENCES return_receipt_tbl(return_receipt_id)
                                           ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;
