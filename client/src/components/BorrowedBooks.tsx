import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BorrowBook } from "../type";
import { apiClient } from "../api/axios";

const defaultMemberId = "2001230753";

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowBook[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBorrowedBooks() {
      setLoading(true);
      try {
        const res = await apiClient.get(`/borrow-receipts/user/${defaultMemberId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            }
          }
        );
        if (res?.data) setBorrowedBooks(res.data.result);
      } catch (error) {
        console.error("Fetch borrowed books error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBorrowedBooks();
  }, []);

  if (loading) {
    return (
      <div className="borrowed-books-section">
        <h5 className="text-center mb-3">
          <i className="fas fa-bookmark me-2"></i>Your Borrowed Books
        </h5>
        <p className="text-center text-muted">Loading borrowed books...</p>
      </div>
    );
  }

  if (borrowedBooks.length === 0) {
    return (
      <div className="borrowed-books-section">
        <h5 className="text-center mb-3">
          <i className="fas fa-bookmark me-2"></i>Your Borrowed Books
        </h5>
        <p className="text-center text-muted">No borrowed books</p>
      </div>
    );
  }

  return (
    <div className="borrowed-books-section">
      <h5 className="text-center mb-3">
        <i className="fas fa-bookmark me-2"></i>Your Borrowed Books
      </h5>

      <div
        style={{
          maxHeight: 300,
          overflowY: "auto",
          paddingRight: 10,
        }}
      >
        {borrowedBooks.map((borrow) => {
          const isOverdue = new Date(borrow.dueDate) < new Date();

          return (
            <div
              key={borrow.borrowReceiptId}
              className="mb-2 p-3 border rounded shadow-sm"
            >
              <div className="fw-bold">{borrow.bookName}</div>

              <div className="text-muted">
                <small>Ngày mượn: {borrow.borrowDate}</small>
                <br />
                <small>Hạn trả: {borrow.dueDate}</small>
                <br />
                <small>Số lượng: {borrow.quantity}</small>
                <br />
                <small>
                  Trạng thái sách:{" "}
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
        <div className="text-center mt-2">
          <button
            className="btn btn-sm btn-outline-primary"
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
