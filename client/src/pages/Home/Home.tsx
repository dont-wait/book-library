import UserInfo from "../../components/UserInfo";
import BorrowedBooks from "../../components/BorrowedBooks";
import BooksGrid from "../../components/BookGrid";
import Pagination from "../../components/Pagination";
import { useState, useEffect } from "react";
import { apiClient } from "../../api/axios";
import { Book, User, BorrowBook } from "../../type";
import { Container, Row, Col } from "react-bootstrap";

interface BookData {
  data: Book[];
}

interface UserData {
  data: User;
}

interface BorrowedBookData {
  data: BorrowBook[];
}

const defaultUser = {
  adminId: "123",
  firstName: "admin",
  lastName: "admin",
  email: "example@gmail.com",
  phone: "1234567890",
  userAccount: {
    isActivated: true,
    roles: ["Admin"],
  },
};

const itemsPerPage = 50;

// Home Page Component
const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>();
  const [borrowBooks, setBorrowBooks] = useState<BorrowBook[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedBooks, setPaginatedBooks] = useState<Book[]>([]);

  // Tính tổng số trang
  const totalPages = Math.ceil(books.length / itemsPerPage);

  // Cập nhật danh sách sách hiển thị khi trang thay đổi
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedBooks(books.slice(startIndex, endIndex));
  }, [currentPage, books, itemsPerPage]);

  // Xử lý khi người dùng chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function getBookData() {
      const bookData: BookData = await apiClient.get("/books");
      if (bookData) {
        setBooks(bookData.data);
      }
    }

    async function getUserInfo() {
      const userInfo: UserData = await apiClient.get("/users");
      if (userInfo) {
        setUser(userInfo.data);
      }
    }

    async function getBorrowedBooks() {
      const borrowedBooks: BorrowedBookData = await apiClient.get(
        "/borrowedBooks"
      );

      if (borrowBooks) {
        setBorrowBooks(borrowedBooks.data);
      }
    }

    getBookData();
    getUserInfo();
    getBorrowedBooks();
  }, []);
  return (
    <div>
      <Container className='mt-4'>
        <Row>
          <Col md={8}>
            <UserInfo user={user ?? defaultUser} />
          </Col>
          <Col md={4}>
            <BorrowedBooks borrowedBooks={borrowBooks} books={books} />
          </Col>
        </Row>
      </Container>

      <Container id='books-section'>
        <Row className='row'>
          <Col xs={12}>
            <h2 className='mb-4'>
              <i className='fas fa-books me-2'></i>Browse Books
              <span className='badge badge-custom ms-2'>{books.length}</span>
            </h2>
          </Col>
        </Row>

        <BooksGrid books={paginatedBooks} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxDisplayedPages={5}
        />
      </Container>
    </div>
  );
};

export default Home;
