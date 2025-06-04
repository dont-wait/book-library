import UserInfo from "../../components/UserInfo";
import BorrowedBooks from "../../components/BorrowedBooks";
import BooksGrid from "../../components/BookGrid";
import Pagination from "../../components/Pagination";
import CategorySidebar from "../../components/CategorySidebar";
import { useState, useEffect } from "react";
import { apiClient } from "../../api/axios";
import { Book, Category, Member } from "../../type";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import BookSearchModal from "../../components/BookSearchModel";

const totalPages = 10;
const itemsPerPage = 50;
interface categoryApiResponse {
  data: { result: Category[] }
}

const Home = () => {
  const [user, setUser] = useState<Member | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedBooks, setPaginatedBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      setLoadingCategories(true);
      try {
        const res: categoryApiResponse = await apiClient.get<{ result: Category[] }>("/categories", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          }
        });
        if (res) {
          const categoriesApi = res.data.result.map((item: any) => ({
            categoryId: item.categoryId,
            categoryName: item.categoryName,
          }));
          setCategories(categoriesApi);
        }
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
      const token = sessionStorage.getItem("authToken");

      let url = `/books?page=${currentPage - 1}&size=${itemsPerPage}`;

      if (selectedCategory) {
        url += `&categoryId=${selectedCategory}`;
      }

      try {
        const res = await apiClient.get(url,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPaginatedBooks(res.data.result);
      } catch (error) {
        console.error("Lỗi khi fetch sách:", error);
      }
    }
    getBooks();
  }, [currentPage, itemsPerPage, selectedCategory]);

  useEffect(() => {
    async function getUserInfo() {
      setLoading(true);
      try {
        const response = await apiClient.get("/members/myInfo", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });

        // Lấy dữ liệu từ response.data.result thay vì response.data
        if (response && response.data && response.data.result) {
          setUser(response.data.result);
          console.log("User data fetched:", response.data.result);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      } finally {
        setLoading(false);
      }
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

  const handleBrowseBooksClick = () => {
    navigate("/browse-books");
  }

  return (
    <>
      <Navigation />
      <Container className="mt-4">
        {/* User Info + Borrowed Books */}
        <Row>
          <Col md={8}>
            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <UserInfo user={user} />
            )}
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
            <h2 className="mb-4" onClick={handleBrowseBooksClick} style={{ cursor: "pointer" }}>
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
      <Footer />
    </>
  );
};

export default Home;