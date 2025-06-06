import { NavLink, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { apiClient } from "../api/axios";
import { useToast } from "../hooks/useToast.ts"

const Navigation = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      // Lấy token từ sessionStorage
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        showToast("No token found. User is not authenticated.", "error");
        return;
      }

      // Gửi yêu cầu API đăng xuất
      const response: {
        data: {
          code: number
        }
      } = await apiClient.post(
        "/auth/log-out",
        { token });

      if (response.data.code === 1000) {
        showToast(" Đăng xuất thành công", "success");

        setAuth({
          userId: "",  // Xóa userId
          roles: "",    // Xóa roles
        });

        sessionStorage.removeItem("authToken");

        navigate("/");
      } else {
        showToast("Đăng xuất thất bại. Vui lòng thử lại.", "error");
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi đăng xuất.", "error");
    }
  };


  return (
    <nav className="navbar navbar-expand-lg  bg-white shadow-sm sticky-top">
      <Container>
        <NavLink className="navbar-brand" to="/">
          <i className="fas fa-book me-2"></i>Library Management
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <a className="nav-link" href="#books-section">
              Browse Books
            </a>
          </div>

          <div className="d-flex align-items-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search books..."
              style={{ fontSize: "16px" }}
            />
            <button className="btn btn-primary me-3" type="button">
              <i className="fas fa-search"></i>
            </button>

            <Button variant="danger" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
