import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, BorrowBook } from "../type";

const BorrowedBooks = ({
  borrowedBooks,
  books,
}: {
  borrowedBooks: BorrowBook[];
  books: Book[];
}) => {
  const navigate = useNavigate();

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

      <div
        style={{
          maxHeight: 300, // chiều cao tối đa cho khung scroll
          overflowY: "auto",
          paddingRight: 10, // để khỏi che nội dung khi có scrollbar
        }}
      >
        {borrowedBooks.map((borrow) => {
          const book = books.find((b) => b.bookName === borrow.bookName);
          const bookName = book ? book.bookName : "Unknown Book";
          const isOverdue = new Date(borrow.dueDate) < new Date();

          return (
            <div key={borrow.borrowReceiptId} className="mb-2 p-3 border rounded shadow-sm">
              <div className="fw-bold">{bookName}</div>

              <div className="text-muted">
                <small>Ngày mượn: {borrow.borrowDate}</small>
                <br />
                <small>Hạn trả: {borrow.dueDate}</small>
                <br />
                <small>Số lượng: {borrow.quantity}</small>
                <br />
                <small>
                  Trạng thái sách:
                  <span
                    className={`badge ms-2 ${borrow.name === "AVAILABLE"
                      ? "bg-success"
                      : borrow.name === "BORROWED"
                        ? "bg-primary"
                        : borrow.name === "LOST"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                  >
                    {borrow.name}
                  </span>
                </small>

                <br />
                <small>Trạng thái phiếu mượn: </small>
                <span
                  className={`badge ${borrow.statusReceiptName === "CANCELED"
                    ? "bg-danger"
                    : borrow.statusReceiptName === "RETURNED"
                      ? "bg-success"
                      : borrow.statusReceiptName === "BORROWED"
                        ? "bg-primary"
                        : borrow.statusReceiptName === "PENDING"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                    }`}
                >
                  {borrow.statusReceiptName}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {borrowedBooks.length > 3 && (
        <div className='text-center mt-2'>
          <button
            className='btn btn-sm btn-outline-primary'
            onClick={() => navigate("/borrowed-books")}
          >
            Xem tất cả
          </button>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
