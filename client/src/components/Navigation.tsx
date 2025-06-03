import { NavLink, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xử lý logout (xóa token, gọi API, v.v)
    // Ví dụ: localStorage.removeItem("token");
    // Sau đó chuyển về trang login:
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
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
