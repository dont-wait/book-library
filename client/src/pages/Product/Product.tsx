import { NavLink } from "react-router-dom";
import { useBookContext } from "../../contexts/BookContext";
import { useNavigate } from "react-router-dom";
import { Book } from "../../type";
import RatingStars from "../../components/RatingStars";
import { Container, Row, Col } from "react-bootstrap";

// Product Page Component
const Product = () => {
  const { selectedBook: book } = useBookContext();
  const navigate = useNavigate();

  if (!book) {
    return (
      <Container className='mt-4'>
        <p className='text-danger'>No book selected.</p>
        <button
          className='btn btn-outline-secondary'
          onClick={() => navigate("/")}>
          Back to Home
        </button>
      </Container>
    );
  }

  const onBorrowBook = (book: Book) => {
    console.log("Borrowing", book.book_name);
  };

  const onBackToHome = () => {
    navigate("/");
  };

  return (
    <Container className='mt-4'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {book.book_name}
          </li>
        </ol>
      </nav>

      <Row>
        <Col md={4}>
          <img
            src={book.book_image_url}
            alt='Book Cover'
            className='img-fluid product-image w-100 mb-3'
          />
        </Col>

        <Col md={8}>
          <h1 className='mb-3'>{book.book_name}</h1>

          <div className='mb-3'>
            <div className='rating-stars mb-2'>
              <RatingStars rating={book.rating} />
              <small className='text-muted ms-1'>({book.rating})</small>
            </div>
            <h3 className='text-primary'>${book.cost}</h3>
          </div>

          <Row className='mb-4'>
            <Col sm={6}>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p>
                <strong>Publisher ID:</strong> {book.publisherId}
              </p>
              <p>
                <strong>Category ID:</strong> {book.categoryId}
              </p>
            </Col>
            <Col sm={6}>
              <p>
                <strong>Author ID:</strong> {book.authorId}
              </p>
              <p>
                <strong>Publication Date:</strong>{" "}
                {book.publicationDate || "Not specified"}
              </p>
              <p>
                <strong>Available Copies:</strong> {book.quantity}
              </p>
            </Col>
          </Row>

          <div className='mb-4'>
            <h5>Description</h5>
            <p className='text-muted'>{book.description}</p>
          </div>

          <div className='mb-3'>
            <p>
              <strong>Floor Position:</strong>{" "}
              {book.floorPosition || "Not specified"}
            </p>
          </div>

          <div className='d-flex gap-2'>
            <button
              className='btn btn-primary btn-lg'
              onClick={() => onBorrowBook(book)}>
              <i className='fas fa-bookmark me-2'></i>Borrow Book
            </button>
            <button
              className='btn btn-outline-secondary btn-lg'
              onClick={onBackToHome}>
              <i className='fas fa-arrow-left me-2'></i>Back to Books
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
