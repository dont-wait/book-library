import { useEffect, useState } from "react";
import { apiClient } from "../api/axios";
import { BorrowBook, Book } from "../type";
import { Container, Table, Image, Button } from "react-bootstrap";
import { format } from "date-fns";
import EditBorrowModal from "./EditBorrowModal"; // import modal sửa

const defaultUserId = "2001230753";

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
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedBorrow, setSelectedBorrow] = useState<BorrowBook | null>(null);

    const fetchData = async () => {
        const borrowRes = await apiClient.get(`/borrow-receipts/user/${defaultUserId}`);
        const booksRes = await apiClient.get(`/books?page=0&size=1000`);
        setBorrowedBooks(borrowRes.data.result);
        setAllBooks(booksRes.data.result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (borrow: BorrowBook) => {
        setSelectedBorrow(borrow);
        setEditModalShow(true);
    };

    const handleUpdateSuccess = () => {
        setEditModalShow(false);
        setSelectedBorrow(null);
        fetchData(); // reload dữ liệu sau khi cập nhật
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Tất cả phiếu mượn của bạn</h2>
            <Table bordered hover responsive className="align-middle">
                <thead className="table-light text-center">
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên sách</th>
                        <th>Ngày mượn</th>
                        <th>Hạn trả</th>
                        <th>Số lượng</th>
                        <th>Trạng thái phiếu</th>
                        <th>Trạng thái sách</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowedBooks.map((borrow) => {
                        const book = allBooks.find((b) => b.bookName === borrow.bookName);
                        const isOverdue = new Date(borrow.dueDate) < new Date();
                        const imageUrl = book?.bookImageURL || "https://via.placeholder.com/60x80?text=No+Image";

                        const formattedBorrowDate = borrow.borrowDate
                            ? format(new Date(borrow.borrowDate), "dd/MM/yyyy")
                            : "-";
                        const formattedDueDate = borrow.dueDate
                            ? format(new Date(borrow.dueDate), "dd/MM/yyyy")
                            : "-";

                        // Chỉ cho phép chỉnh sửa khi trạng thái chưa APPROVED hoặc CANCELED
                        const canEdit =
                            borrow.statusReceiptName.toUpperCase() !== "APPROVED" &&
                            borrow.statusReceiptName.toUpperCase() !== "CANCELED";

                        return (
                            <tr key={borrow.borrowReceiptId}>
                                <td className="text-center">
                                    <Image
                                        src={imageUrl}
                                        alt={book?.bookName}
                                        thumbnail
                                        style={{ width: 60, height: 80, objectFit: "cover" }}
                                    />
                                </td>
                                <td style={{ maxWidth: 220 }}>
                                    <div
                                        style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                        title={book?.bookName}
                                    >
                                        {book?.bookName || "Unknown Book"}
                                    </div>
                                </td>
                                <td className="text-center">{formattedBorrowDate}</td>
                                <td className="text-center">{formattedDueDate}</td>
                                <td className="text-center">{borrow.quantity}</td>
                                <td className="text-center">
                                    <span className={`badge ${receiptStatusColor(borrow.statusReceiptName)}`}>
                                        {borrow.statusReceiptName}
                                    </span>
                                    {isOverdue && <span className="badge bg-danger ms-2">Quá hạn</span>}
                                </td>
                                <td className="text-center">
                                    <span className={`badge ${bookStatusColor(borrow.name)}`}>
                                        {borrow.name}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {canEdit && (
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handleEditClick(borrow)}
                                        >
                                            Sửa
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {selectedBorrow && (
                <EditBorrowModal
                    show={editModalShow}
                    borrow={selectedBorrow}
                    onClose={() => setEditModalShow(false)}
                    onSuccess={handleUpdateSuccess}
                />
            )}
        </Container>
    );
};

export default BorrowedBooksPage;
