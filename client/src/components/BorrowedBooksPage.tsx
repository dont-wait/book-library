import { useEffect, useState } from "react";
import { apiClient } from "../api/axios";
import { BorrowBook, Book } from "../type";
import { Container, Row, Col, Image } from "react-bootstrap";
import { format } from "date-fns";

const defaultUserId = "2001230753";

// Màu cho trạng thái sách
const bookStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "available":
            return "bg-success";
        case "borrowed":
            return "bg-primary";
        case "damaged":
            return "bg-warning text-dark";
        case "lost":
            return "bg-danger";
        default:
            return "bg-secondary";
    }
};

// Màu cho trạng thái phiếu mượn
const receiptStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
        case "CANCELED":
            return "bg-danger";
        case "RETURNED":
            return "bg-success";
        case "BORROWED":
            return "bg-primary";
        case "PENDING":
            return "bg-warning text-dark";
        default:
            return "bg-secondary";
    }
};

const BorrowedBooksPage = () => {
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowBook[]>([]);
    const [allBooks, setAllBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const borrowRes = await apiClient.get(`/borrow-receipts/user/${defaultUserId}`);
            const booksRes = await apiClient.get(`/books?page=0&size=1000`);
            setBorrowedBooks(borrowRes.data.result);
            setAllBooks(booksRes.data.result);
        };
        fetchData();
    }, []);

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Tất cả phiếu mượn của bạn</h2>
            {borrowedBooks.map((borrow) => {
                const book = allBooks.find((b) => b.bookName === borrow.bookName);
                const isOverdue = new Date(borrow.dueDate) < new Date();
                const imageUrl = book?.bookImageURL || "https://via.placeholder.com/60x80?text=No+Image";

                const formattedBorrowDate = borrow.borrowDate ? format(new Date(borrow.borrowDate), "dd/MM/yyyy") : "-";
                const formattedDueDate = borrow.dueDate ? format(new Date(borrow.dueDate), "dd/MM/yyyy") : "-";

                return (
                    <Row
                        key={borrow.borrowReceiptId}
                        className="align-items-center border rounded mb-3 p-3"
                        style={{ minHeight: 90 }}
                    >
                        <Col xs="auto">
                            <Image
                                src={imageUrl}
                                alt={book?.bookName}
                                thumbnail
                                style={{ width: 60, height: 80, objectFit: "cover" }}
                            />
                        </Col>
                        <Col className="d-flex flex-wrap align-items-center">
                            <div className="me-4" style={{ minWidth: 150, fontWeight: "600" }}>
                                {book?.bookName || "Unknown Book"}
                            </div>


                            <div className="me-4 text-muted small" style={{ minWidth: 110 }}>
                                <div>Ngày mượn:</div>
                                <div>{formattedBorrowDate}</div>
                            </div>
                            <div className="me-4 text-muted small" style={{ minWidth: 110 }}>
                                <div>Hạn trả:</div>
                                <div>{formattedDueDate}</div>
                            </div>
                            <div className="me-4 text-muted small" style={{ minWidth: 70 }}>
                                <div>Số lượng:</div>
                                <div>{borrow.quantity}</div>
                            </div>
                            <div className="me-4" style={{ minWidth: 130 }}>
                                <div>Trạng thái phiếu:</div>
                                <span className={`badge ${receiptStatusColor(borrow.statusReceiptName)}`} title={`Trạng thái: ${borrow.statusReceiptName}`}>
                                    {borrow.statusReceiptName}
                                </span>
                                {isOverdue && <span className="badge bg-danger ms-2">Quá hạn</span>}
                            </div>

                            <div className="me-4" style={{ minWidth: 120 }}>
                                <div>Trạng thái sách:</div>
                                <span className={`badge ${bookStatusColor(borrow.name)}`}>
                                    {borrow.name}
                                </span>
                            </div>
                        </Col>
                    </Row>
                );
            })}
        </Container>
    );
};

export default BorrowedBooksPage;
