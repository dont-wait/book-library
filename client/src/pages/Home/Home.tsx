import UserInfo from "../../components/UserInfo";
import BorrowedBooks from "../../components/BorrowedBooks";
import BooksGrid from "../../components/BookGrid";
import Pagination from "../../components/Pagination";
import { useState, useEffect } from "react";
import { apiClient } from "../../api/axios";
import { Book, BorrowBook, Member } from "../../type";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface UserData {
  data: Member;
}

interface BorrowedBookData {
  data: BorrowBook[];
}

const defaultUser = {
  memberId: "2001230753",
  firstName: "Sang",
  lastName: "Nguyen",
  email: "sangnguyen@gmail.com",
  phone: "1234567890",
  userAccount: {
    isActivated: true,
    roles: ["Member"],
  },
};

const totalPages: number = 10;
const itemsPerPage: number = 50;

// Home Page Component
const Home = () => {
  const [user, setUser] = useState<Member>();
  const [borrowBooks, setBorrowBooks] = useState<BorrowBook[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedBooks, setPaginatedBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  // Tính tổng số trang

  // Cập nhật danh sách sách hiển thị khi trang thay đổi
  useEffect(() => {
    async function getItemPerPage() {
      const bookData = await apiClient.get(`/books?page=${currentPage - 1}&size=${itemsPerPage}`);
      setPaginatedBooks(bookData.data.result);
    }
    getItemPerPage();
  }, [currentPage, itemsPerPage]);

  // Xử lý khi người dùng chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
  };

  useEffect(() => {

    async function getUserInfo() {
      const userInfo: UserData = await apiClient.get("/members");
      if (userInfo?.data) {
        setUser(userInfo.data);
      }
    }

    async function getBorrowedBooks() {
      //const member = user?.memberId;
      const borrowedBooks: BorrowedBookData = await apiClient.get(
        `/borrow-receipts/user/${defaultUser.memberId}`

      );
      console.log("booo: ", borrowedBooks.data.result)
      if (borrowedBooks?.data) {
        setBorrowBooks(borrowedBooks.data.result);
      }
    }

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
            <BorrowedBooks borrowedBooks={borrowBooks} books={paginatedBooks} />
          </Col>
        </Row>
      </Container>

      <Container id='books-section'>
        <Row className='row'>
          <Col xs={12}>
            <h2 className='mb-4'>
              <i className='fas fa-books me-2'></i>Browse Books
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
