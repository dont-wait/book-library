import RatingStars from "./RatingStars";
import priceFormat from "../util/formatNumber";
import { Book } from "../type";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../contexts/BookContext";
import { Col, Card } from "react-bootstrap";

// Book Card Component
const BookCard = ({ book }: { book: Book }) => {
  const { setSelectedBook } = useBookContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedBook(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/product");
  };

  return (
    <Col lg={3} md={4} sm={6} className='mb-4' onClick={handleClick}>
      <Card className='book-card h-100'>
        <img
          src={book.bookImageURL}
          className='card-img-top book-image'
          alt={book.bookName}
          loading='lazy'
        />
        <Card.Body className='d-flex flex-column'>
          <Card.Title>{book.bookName}</Card.Title>
          <div className='rating-stars mb-2'>
            <RatingStars rating={book.rating} />
            <small className='text-muted ms-1'>({book.rating})</small>
          </div>
          <Card.Text className='text-muted small flex-grow-1'>
            {book.description.substring(0, 80)}...
          </Card.Text>
          <div className='mt-auto'>
            <div className='d-flex justify-content-between align-items-center'>
              <span className='h6 text-primary mb-0'>
                ${priceFormat(book.cost)}
              </span>
              <small className='text-muted'>
                {priceFormat(book.quantity)} available
              </small>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BookCard;
