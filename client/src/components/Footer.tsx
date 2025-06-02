import { Container, Row, Col } from "react-bootstrap";

// Footer Component
const Footer = () => {
  return (
    <footer className='footer py-5'>
      <Container>
        <Row>
          <Col md={4}>
            <h5>Library Management</h5>
            <p className='text-light'>
              Your digital gateway to knowledge and learning.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className='list-unstyled'>
              <li>
                <a href='#' className='text-light text-decoration-none'>
                  Browse Books
                </a>
              </li>
              <li>
                <a href='#' className='text-light text-decoration-none'>
                  My Account
                </a>
              </li>
              <li>
                <a href='#' className='text-light text-decoration-none'>
                  Help Center
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p className='text-light mb-1'>
              <i className='fas fa-envelope me-2'></i>library@example.com
            </p>
            <p className='text-light'>
              <i className='fas fa-phone me-2'></i>+1 (555) 123-4567
            </p>
          </Col>
        </Row>
        <hr className='mt-4 mb-3' />
        <div className='text-center'>
          <p className='mb-0 text-light'>
            &copy; 2024 Library Management System. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
