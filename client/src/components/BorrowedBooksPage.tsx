import { useEffect, useState } from "react";
import { apiClient } from "../api/axios";
import { BorrowBook, Book } from "../type";
import { Container, Table, Image, Button, Dropdown, Form } from "react-bootstrap";
import { format } from "date-fns";
import EditBorrowModal from "../components/EditBorrowModal";
import { useToast } from "../hooks/useToast";
import priceFormat from "../util/formatNumber";
import PaymentInfo from "./PaymentInfo";
import { FaCreditCard } from "react-icons/fa";

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
    const [showPaymentInfo, setPaymentInfo] = useState(false);

    // Mảng chứa các borrowReceiptId được chọn để thanh toán
    const [selectedUnpaidIds, setSelectedUnpaidIds] = useState<string[]>([]);

    const fetchData = async () => {
        try {
            const borrowRes = await apiClient.get(`/borrow-receipts/user/${defaultUserId}`);
            const booksRes = await apiClient.get(`/books?page=0&size=1000`);
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
        if (borrow.statusReceiptName.toUpperCase() === "UNPAID") {
            setEditingBorrow(borrow);
            setShowModal(true);
        } else {
            showToast("Chỉ có phiếu UNPAID mới được chỉnh sửa", "error");
        }
    };

    const handleDelete = async (borrow: BorrowBook) => {
        if (borrow.statusReceiptName.toUpperCase() !== "UNPAID") {
            showToast("Chỉ được phép xóa khi trạng thái là UNPAID", "error");
            return;
        }
        try {
            await apiClient.delete(`/borrow-receipts/${borrow.borrowReceiptId}`);
            showToast("Xóa thành công", "success");
            fetchData();
            // Xóa khỏi danh sách chọn nếu có
            setSelectedUnpaidIds((prev) => prev.filter(id => id !== borrow.borrowReceiptId));
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

    // Tính tổng chi phí các phiếu được chọn thanh toán
    const totalSelectedCost = unpaidReceipts
        .filter(b => selectedUnpaidIds.includes(b.borrowReceiptId))
        .reduce((total, b) => total + (b.costBorrow || 0), 0);

    const handlePaySelected = () => {
        if (selectedUnpaidIds.length === 0) {
            showToast("Vui lòng chọn ít nhất một phiếu để thanh toán", "error");
            return;
        }
        setPaymentInfo(true);
    };

    const toggleSelect = (borrowReceiptId: string) => {
        setSelectedUnpaidIds((prev) =>
            prev.includes(borrowReceiptId)
                ? prev.filter(id => id !== borrowReceiptId)
                : [...prev, borrowReceiptId]
        );
    };

    const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedUnpaidIds(unpaidReceipts.map(b => b.borrowReceiptId));
        } else {
            setSelectedUnpaidIds([]);
        }
    };
    const handleConfirmPayment = async () => {
        try {
            for (const id of selectedUnpaidIds) {
                await apiClient.put(`/borrow-receipts/${id}`, {
                    statusReceiptName: "PENDING"
                });
            }
            showToast("Thanh toán thành công, trạng thái đã được cập nhật", "success");
            setPaymentInfo(false);
            fetchData();
            setSelectedUnpaidIds([]);
        } catch {
            showToast("Thanh toán thất bại, vui lòng thử lại", "error");
        }
    };


    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Tất cả phiếu mượn của bạn</h2>
                {unpaidReceipts.length > 0 && (
                    <Button
                        variant="danger"
                        size="lg"
                        onClick={handlePaySelected}
                        disabled={selectedUnpaidIds.length === 0}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "30px",
                            fontWeight: "600",
                            boxShadow: selectedUnpaidIds.length > 0
                                ? "0 4px 12px rgba(220, 53, 69, 0.5)"
                                : "none",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={e => {
                            if (selectedUnpaidIds.length > 0) {
                                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#c82333";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 18px rgba(220, 53, 69, 0.7)";
                            }
                        }}
                        onMouseLeave={e => {
                            if (selectedUnpaidIds.length > 0) {
                                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(220, 53, 69, 0.5)";
                            }
                        }}
                    >
                        <FaCreditCard style={{ marginRight: 8 }} />
                        Thanh toán ({totalSelectedCost.toLocaleString()}đ)
                    </Button>
                )}
            </div>

            <Table bordered hover responsive className="align-middle">
                <thead className="table-light text-center">
                    <tr>
                        <th>
                            {/* Checkbox chọn tất cả chỉ với phiếu UNPAID */}
                            <Form.Check
                                type="checkbox"
                                disabled={unpaidReceipts.length === 0}
                                checked={selectedUnpaidIds.length === unpaidReceipts.length && unpaidReceipts.length > 0}
                                onChange={handleSelectAllChange}
                            />
                        </th>
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
                        const imageUrl = book?.bookImageURL || "https://via.placeholder.com/60x80?text=No+Image";
                        const formattedBorrowDate = borrow.borrowDate ? format(new Date(borrow.borrowDate), "dd/MM/yyyy") : "-";
                        const formattedDueDate = borrow.dueDate ? format(new Date(borrow.dueDate), "dd/MM/yyyy") : "-";
                        const isUnpaid = borrow.statusReceiptName === "UNPAID";

                        return (
                            <tr key={borrow.borrowReceiptId}>
                                <td className="text-center">
                                    {/* Checkbox chỉ hiển thị với phiếu UNPAID */}
                                    {isUnpaid ? (
                                        <Form.Check
                                            type="checkbox"
                                            checked={selectedUnpaidIds.includes(borrow.borrowReceiptId)}
                                            onChange={() => toggleSelect(borrow.borrowReceiptId)}
                                        />
                                    ) : null}
                                </td>
                                <td className="text-center">
                                    <Image src={imageUrl} alt={book?.bookName} thumbnail style={{ width: 90, height: 120, objectFit: "cover" }} />
                                </td>
                                <td style={{ maxWidth: 220 }}>
                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={book?.bookName}>
                                        {book?.bookName || "Unknown Book"}
                                    </div>
                                </td>
                                <td className="text-center">{formattedBorrowDate}</td>
                                <td className="text-center">{formattedDueDate}</td>
                                <td className="text-center">{borrow.quantity}</td>
                                <td className="text-center">{priceFormat(borrow.costBorrow)}</td>
                                <td className="text-center">
                                    <span className={`badge ${receiptStatusColor(borrow.statusReceiptName)}`}>
                                        {borrow.statusReceiptName}
                                    </span>
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
                                            {isUnpaid && (
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
            {showPaymentInfo && (
                <PaymentInfo
                    amount={totalSelectedCost}
                    onClose={() => setPaymentInfo(false)}
                    onSuccess={() => {
                        setPaymentInfo(false);
                        handleConfirmPayment();
                        fetchData();
                        setSelectedUnpaidIds([]); // reset chọn sau thanh toán thành công
                    }}
                    selectedIds={selectedUnpaidIds} // truyền id các phiếu thanh toán cho PaymentInfo xử lý
                />
            )}
        </Container>
    );
};

export default BorrowedBooksPage;
