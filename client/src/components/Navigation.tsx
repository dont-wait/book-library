import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

// Navigation Component
const Navigation = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top'>
      <Container>
        <NavLink className='navbar-brand' to='/'>
          <i className='fas fa-book me-2'></i>Library Management
        </NavLink>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <div className='navbar-nav me-auto'>
            <NavLink to='/' className='nav-link'>
              Home
            </NavLink>
            <a className='nav-link' href='#books-section'>
              Browse Books
            </a>
          </div>

          <div className='d-flex search-container'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search books...'
              style={{ fontSize: "16px" }}
            />
            <button className='btn btn-primary' type='button'>
              <i className='fas fa-search'></i>
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
