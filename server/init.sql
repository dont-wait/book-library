CREATE TABLE Author (
                        AuthorId   int(10) NOT NULL AUTO_INCREMENT,
                        AuthorName varchar(255) NOT NULL,
                        Bio        varchar(255),
                        PRIMARY KEY (AuthorId));
CREATE TABLE Book (
                      BookId            int(10) NOT NULL,
                      BookName          varchar(255) NOT NULL,
                      Description       varchar(255),
                      BookImage         text,
                      Quantity          int(10),
                      Cost              decimal(19, 0) NOT NULL,
                      ISBN              char(20) NOT NULL UNIQUE,
                      PublishcationDate date,
                      CategoryId        int(10) NOT NULL,
                      PublisherId       int(10) NOT NULL,
                      Position          int(11),
                      PRIMARY KEY (BookId));
CREATE TABLE BookAuthor (
                            AuthorId int(10) NOT NULL,
                            BookId   int(10) NOT NULL);
CREATE TABLE BorrowReceiptDetail (
                                     BorrowReceptDetailId int(11) NOT NULL,
                                     DueDate              date NOT NULL,
                                     StatusBookId         int(10) NOT NULL,
                                     BookId               int(10) NOT NULL,
                                     ReceipId             int(11) NOT NULL,
                                     PRIMARY KEY (BorrowReceptDetailId));
CREATE TABLE BorrowReceiptTbl (
                                  BorrowReceiptId int(11) NOT NULL AUTO_INCREMENT,
                                  BorrowDate      date NOT NULL,
                                  ReturnDate      date,
                                  StatusId        int(10) NOT NULL,
                                  UserId          char(11) NOT NULL,
                                  LibrarianId     char(11) NOT NULL,
                                  PRIMARY KEY (BorrowReceiptId));
CREATE TABLE Category (
                          CategoryId   int(10) NOT NULL,
                          CategoryName varchar(255) NOT NULL UNIQUE,
                          PRIMARY KEY (CategoryId));
CREATE TABLE Librarian (
                           LibrarianId       char(11) NOT NULL,
                           FirstName         varchar(30) NOT NULL,
                           LastName          varchar(50) NOT NULL,
                           LibrarianContact  char(11) NOT NULL UNIQUE,
                           LibrarianPosition varchar(50) NOT NULL,
                           PRIMARY KEY (LibrarianId));
CREATE TABLE Member (
                        MemberId      char(11) NOT NULL,
                        FirstName     varchar(30) NOT NULL,
                        LastName      varchar(50) NOT NULL,
                        MemberGenre   int(11) NOT NULL,
                        MemberContact char(11) NOT NULL UNIQUE,
                        PRIMARY KEY (MemberId));
CREATE TABLE Publisher (
                           PublisherId   int(10) NOT NULL AUTO_INCREMENT,
                           PublisherName varchar(255) NOT NULL UNIQUE,
                           PRIMARY KEY (PublisherId));
CREATE TABLE ReturnReceiptDetail (
                                     ReturnReceipDetailId int(11) NOT NULL AUTO_INCREMENT,
                                     StatusBookId         int(10) NOT NULL,
                                     BorrowReceptDetailId int(11) NOT NULL,
                                     ReturnReceiptId      int(11) NOT NULL,
                                     FineCost             decimal(19, 0),
                                     ReasonFine           varchar(255),
                                     PRIMARY KEY (ReturnReceipDetailId));
CREATE TABLE ReturnReceiptTbl (
                                  ReturnReceiptId int(11) NOT NULL,
                                  BorrowReceiptId int(11) NOT NULL,
                                  LibrarianId     char(11) NOT NULL,
                                  ReturnDate      date NOT NULL,
                                  Note            varchar(255),
                                  PRIMARY KEY (ReturnReceiptId));
CREATE TABLE Role (
                      RoleId   int(10) NOT NULL AUTO_INCREMENT,
                      RoleName varchar(255) NOT NULL,
                      PRIMARY KEY (RoleId));
CREATE TABLE StatusBook (
                            StatusBookId   int(10) NOT NULL AUTO_INCREMENT,
                            StatusBookName date NOT NULL UNIQUE,
                            PRIMARY KEY (StatusBookId));
CREATE TABLE StatusReceipt (
                               StatusReceiptId     int(10) NOT NULL AUTO_INCREMENT,
                               StatusReceiptIdName varchar(255) NOT NULL UNIQUE,
                               PRIMARY KEY (StatusReceiptId));
CREATE TABLE UserAccount (
                             UserId   char(11) NOT NULL,
                             Password int(10) NOT NULL,
                             RoleId   int(10) NOT NULL,
                             Status   int(11) DEFAULT 1,
                             PRIMARY KEY (UserId));
ALTER TABLE UserAccount ADD CONSTRAINT FKUserAccoun105821 FOREIGN KEY (RoleId) REFERENCES Role (RoleId);
ALTER TABLE Book ADD CONSTRAINT FKBook958404 FOREIGN KEY (PublisherId) REFERENCES Publisher (PublisherId);
ALTER TABLE BookAuthor ADD CONSTRAINT FKBookAuthor399088 FOREIGN KEY (BookId) REFERENCES Book (BookId);
ALTER TABLE BookAuthor ADD CONSTRAINT FKBookAuthor571460 FOREIGN KEY (AuthorId) REFERENCES Author (AuthorId);
ALTER TABLE BorrowReceiptTbl ADD CONSTRAINT FKBorrowRece823000 FOREIGN KEY (StatusId) REFERENCES StatusReceipt (StatusReceiptId);
ALTER TABLE BorrowReceiptTbl ADD CONSTRAINT FKBorrowRece97849 FOREIGN KEY (UserId) REFERENCES UserAccount (UserId);
ALTER TABLE BorrowReceiptDetail ADD CONSTRAINT FKBorrowRece445274 FOREIGN KEY (ReceipId) REFERENCES BorrowReceiptTbl (BorrowReceiptId);
ALTER TABLE BorrowReceiptDetail ADD CONSTRAINT FKBorrowRece112182 FOREIGN KEY (BookId) REFERENCES Book (BookId);
ALTER TABLE BorrowReceiptDetail ADD CONSTRAINT FKBorrowRece350070 FOREIGN KEY (StatusBookId) REFERENCES StatusBook (StatusBookId);
ALTER TABLE Book ADD CONSTRAINT FKBook712843 FOREIGN KEY (CategoryId) REFERENCES Category (CategoryId);
ALTER TABLE Member ADD CONSTRAINT FKMember788719 FOREIGN KEY (MemberId) REFERENCES UserAccount (UserId);
ALTER TABLE UserAccount ADD CONSTRAINT FKUserAccoun916794 FOREIGN KEY (UserId) REFERENCES Librarian (LibrarianId);
ALTER TABLE BorrowReceiptTbl ADD CONSTRAINT FKBorrowRece147735 FOREIGN KEY (LibrarianId) REFERENCES Librarian (LibrarianId);
ALTER TABLE ReturnReceiptTbl ADD CONSTRAINT FKReturnRece112862 FOREIGN KEY (BorrowReceiptId) REFERENCES BorrowReceiptTbl (BorrowReceiptId);
ALTER TABLE ReturnReceiptTbl ADD CONSTRAINT FKReturnRece501536 FOREIGN KEY (LibrarianId) REFERENCES Librarian (LibrarianId);
ALTER TABLE ReturnReceiptDetail ADD CONSTRAINT FKReturnRece451442 FOREIGN KEY (ReturnReceiptId) REFERENCES ReturnReceiptTbl (ReturnReceiptId);
ALTER TABLE ReturnReceiptDetail ADD CONSTRAINT FKReturnRece712895 FOREIGN KEY (StatusBookId) REFERENCES StatusBook (StatusBookId);
ALTER TABLE ReturnReceiptDetail ADD CONSTRAINT FKReturnRece54790 FOREIGN KEY (BorrowReceptDetailId) REFERENCES BorrowReceiptDetail (BorrowReceptDetailId);


