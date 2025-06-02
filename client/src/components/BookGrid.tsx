import BookCard from "./BookCard";
import { Book } from "../type";
import { Row } from "react-bootstrap";

// Books Grid Component
const BooksGrid = ({ books }: { books: Book[] }) => {
  if (books?.length === 0) {
    return (
      <div className='text-center py-5'>
        <i className='fas fa-search fa-3x text-muted mb-3'></i>
        <h4 className='text-muted'>No books found</h4>
        <p className='text-muted'>Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <Row>
      {books?.map((book, idx: number) => (
        <BookCard key={idx} book={book} />
      ))}
    </Row>
  );
};

export default BooksGrid;
