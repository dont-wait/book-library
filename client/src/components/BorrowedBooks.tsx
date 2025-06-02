import { Book, BorrowBook } from "../type";

const BorrowedBooks = ({
  borrowedBooks,
  books,
}: {
  borrowedBooks: BorrowBook[];
  books: Book[];
}) => {
  if (borrowedBooks.length === 0) {
    return (
      <div className='borrowed-books-section'>
        <h5 className='text-center mb-3'>
          <i className='fas fa-bookmark me-2'></i>Your Borrowed Books
        </h5>
        <p className='text-muted text-center'>No borrowed books</p>
      </div>
    );
  }

  return (
    <div className='borrowed-books-section'>
      <h5 className='text-center mb-3'>
        <i className='fas fa-bookmark me-2'></i>Your Borrowed Books
      </h5>
      {borrowedBooks.map((borrow) => {
        const book = books.find((b) => b.bookName === borrow.bookName);
        const bookName = book ? book.bookName : "Unknown Book";
        const isOverdue = new Date(borrow.dueDate) < new Date();

        return (
          <div key={borrow.borrowReceiptId} className='mb-2 p-2 border rounded'>
            <small className='fw-bold'>{bookName}</small>
            <br />
            <small className='text-muted'>Due: {borrow.dueDate}</small>
            {isOverdue && <span className='badge bg-danger ms-1'>Overdue</span>}
          </div>
        );
      })}
    </div>
  );
};

export default BorrowedBooks;
