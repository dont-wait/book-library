import UserInfo from "../../components/UserInfo";
import BorrowedBooks from "../../components/BorrowedBooks";
import BooksGrid from "../../components/BookGrid";
import Pagination from "../../components/Pagination";
import CategorySidebar from "../../components/CategorySidebar";
import { useState, useEffect } from "react";
import { apiClient } from "../../api/axios";
import { Book, Member } from "../../type";
import { Container, Row, Col, Button } from "react-bootstrap";

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

const totalPages = 10;
const itemsPerPage = 50;

const Home = () => {
  const [user, setUser] = useState<Member>();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedBooks, setPaginatedBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      setLoadingCategories(true);
      try {
        const res = await apiClient.get<Category[]>("/categories");
        const categoriesApi = res.data.result.map((item: any) => ({
          id: item.categoryId.toString(),
          name: item.categoryName,
        }));
        setCategories(categoriesApi);
      } catch (err) {
        console.error("Không tải được danh sách thể loại");
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function getBooks() {
      // Nếu chưa chọn thể loại thì gọi API lấy sách tất cả với phân trang
      // Nếu có chọn thể loại thì gọi API lấy sách theo thể loại + phân trang

      let url = `/books?page=${currentPage - 1}&size=${itemsPerPage}`;

      if (selectedCategory) {
        url += `&categoryId=${selectedCategory}`;
        console.log(`Fetching books for category: ${selectedCategory}`);
      } else {
        console.log("Fetching all books without category filter");
      }

      try {
        const res = await apiClient.get(url);
        setPaginatedBooks(res.data.result);
      } catch (error) {
        console.error("Lỗi khi fetch sách:", error);
      }
    }
    getBooks();
  }, [currentPage, itemsPerPage, selectedCategory]);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await apiClient.get("/members");
      if (userInfo?.data) setUser(userInfo.data);
    }
    getUserInfo();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTop = () => {
    const element = document.getElementById("book-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Container className="mt-4">
        {/* User Info + Borrowed Books */}
        <Row>
          <Col md={8}>
            <UserInfo user={user ?? defaultUser} />
          </Col>
          <Col md={4}>
            <BorrowedBooks />
          </Col>
        </Row>

        {/* Category + Browse Books */}
        <Row className="mt-5" id="book-section">
          <Col md={3}>
            <CategorySidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(categoryId) => {
                setSelectedCategory(categoryId);
                setCurrentPage(1); // reset page về 1 khi đổi thể loại
                handleScrollTop();
              }}
              categories={categories}

            />
          </Col>

          <Col md={9}>
            <h2 className="mb-4">
              <i className="fas fa-books me-2"></i>Browse Books
            </h2>

            <BooksGrid books={paginatedBooks} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              maxDisplayedPages={5}

            />
          </Col>
        </Row>
      </Container>

      {/* Nút Scroll to Top */}
      <Button
        onClick={handleScrollTop}
        variant="primary"
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </Button>
    </>
  );
};

export default Home;
