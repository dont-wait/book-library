import { useEffect, useState } from "react";
import { apiClient } from "../api/axios";
import { BorrowBook, Book } from "../type";
import { Container, Table, Image, Button, Dropdown } from "react-bootstrap";
import { format } from "date-fns";
import EditBorrowModal from "../components/EditBorrowModal";
import { useToast } from "../hooks/useToast";

const defaultUserId = "2001230753";

const bookStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "available": return "bg-success";
        case "borrowed": return "bg-primary";
        case "damaged": return "bg-warning text-dark";
        case "lost": return "bg-danger";
        default: return "bg-secondary";
    }
};

const receiptStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
        case "CANCELED": return "bg-danger";
        case "RETURNED": return "bg-success";
        case "BORROWED": return "bg-primary";
        case "PENDING": return "bg-warning text-dark";
        case "UNPAID": return "bg-danger";
        default: return "bg-secondary";
    }
};

const BorrowedBooksPage = () => {
    const { showToast } = useToast();
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowBook[]>([]);
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [editingBorrow, setEditingBorrow] = useState<BorrowBook | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        try {
            const borrowRes = await apiClient.get(`/borrow-receipts/user/${defaultUserId}`);
            const booksRes = await apiClient.get(`/books?page=0&size=1000`);
            console.log(borrowRes.data.result);
            setBorrowedBooks(borrowRes.data.result);
            setAllBooks(booksRes.data.result);
        } catch {
            showToast("Không thể tải dữ liệu", "error");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (borrow: BorrowBook) => {
        if (!["APPROVED", "CANCELED"].includes(borrow.statusReceiptName.toUpperCase())) {
            setEditingBorrow(borrow);
            setShowModal(true);
        }
    };

    const handleDelete = async (borrow: BorrowBook) => {
        if (borrow.statusReceiptName.toUpperCase() !== "PENDING") {
            showToast("Chỉ được phép xóa khi trạng thái là PENDING", "info");
            return;
        }
        try {
            await apiClient.delete(`/borrow-receipts/${borrow.borrowReceiptId}`);
            showToast("Xóa thành công", "success");
            fetchData();
        } catch {
            showToast("Xóa thất bại", "error");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingBorrow(null);
    };

    const handleSuccessModal = () => {
        fetchData();
        handleCloseModal();
    };

    const unpaidReceipts = borrowedBooks.filter(b => b.statusReceiptName === "UNPAID");
    const totalUnpaidCost = unpaidReceipts.reduce((total, b) => total + (b.costBorrow || 0), 0);

    const handlePayAll = async () => {
        try {
            const ids = unpaidReceipts.map(b => b.borrowReceiptId);
            await apiClient.post(`/borrow-receipts/pay`, { ids });
            showToast("Thanh toán thành công", "success");
            fetchData();
        } catch {
            showToast("Thanh toán thất bại", "error");
        }
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Tất cả phiếu mượn của bạn</h2>
                {unpaidReceipts.length > 0 && (
                    <Button variant="danger" size="sm" onClick={handlePayAll}>
                        Thanh toán tất cả ({totalUnpaidCost.toLocaleString()}đ)
                    </Button>
                )}
            </div>

            <Table bordered hover responsive className="align-middle">
                <thead className="table-light text-center">
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên sách</th>
                        <th>Ngày mượn</th>
                        <th>Hạn trả</th>
                        <th>Số lượng</th>
                        <th>Chi phí</th>
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
                        const formattedBorrowDate = borrow.borrowDate ? format(new Date(borrow.borrowDate), "dd/MM/yyyy") : "-";
                        const formattedDueDate = borrow.dueDate ? format(new Date(borrow.dueDate), "dd/MM/yyyy") : "-";
                        const cost = borrow || 0;

                        return (
                            <tr key={borrow.borrowReceiptId}>
                                <td className="text-center">
                                    <Image src={imageUrl} alt={book?.bookName} thumbnail style={{ width: 60, height: 80, objectFit: "cover" }} />
                                </td>
                                <td style={{ maxWidth: 220 }}>
                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={book?.bookName}>
                                        {book?.bookName || "Unknown Book"}
                                    </div>
                                </td>
                                <td className="text-center">{formattedBorrowDate}</td>
                                <td className="text-center">{formattedDueDate}</td>
                                <td className="text-center">{borrow.quantity}</td>
                                <td className="text-center">{borrow.costBorrow}</td>
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
                                    <Dropdown align="end">
                                        <Dropdown.Toggle
                                            as="button"
                                            className="btn btn-sm btn-outline-secondary border-0"
                                            id={`dropdown-action-${borrow.borrowReceiptId}`}
                                        >
                                            <i className="fas fa-cog"></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEditClick(borrow)}>Chỉnh sửa</Dropdown.Item>
                                            {borrow.statusReceiptName === "UNPAID" && (
                                                <Dropdown.Item onClick={() => handleDelete(borrow)}>Xóa</Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {editingBorrow && (
                <EditBorrowModal
                    show={showModal}
                    borrow={editingBorrow}
                    onClose={handleCloseModal}
                    onSuccess={handleSuccessModal}
                />
            )}
        </Container>
    );
};

export default BorrowedBooksPage;
