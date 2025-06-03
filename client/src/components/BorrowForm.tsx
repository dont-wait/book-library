// components/BorrowForm.tsx
import { useState } from "react";
import { apiClient } from "../api/axios";
import { Book } from "../type";
import { useToast } from "../hooks/useToast";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

interface BorrowFormProps {
    book: Book;
    userId: string;
    onSuccess?: () => void;
    onClose?: () => void;
}

const BorrowForm = ({ book, userId, onSuccess, onClose }: BorrowFormProps) => {
    const [quantity, setQuantity] = useState(1);
    const [borrowDate, setBorrowDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            borrowDate,
            dueDate,
            quantity,
            bookId: book.bookId,
            userId,
            name: "Available",
            statusReceiptName: "UNPAID",
        };

        try {
            const response = await apiClient.post("/borrow-receipts", payload);
            showToast("Phiếu mượn đã được tạo thành công!", "success");
            onSuccess?.();
            onClose?.();
        } catch (error: any) {
            console.error("Lỗi khi tạo phiếu mượn:", error.response || error.message || error);
            showToast("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border rounded p-4 mt-4 bg-light shadow-sm">
            <h5 className="mb-3 text-primary">📘 Mượn sách: <strong>{book.bookName}</strong></h5>

            <div className="mb-3">
                <label className="form-label">📅 Ngày mượn</label>
                <input
                    type="date"
                    className="form-control"
                    value={borrowDate}
                    onChange={(e) => setBorrowDate(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">📆 Hạn trả</label>
                <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="form-label">🔢 Số lượng (Tối đa: {book.quantity})</label>
                <input
                    type="number"
                    className="form-control"
                    min={1}
                    max={book.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    required
                />
            </div>

            <div className="d-flex">
                <button type="submit" className="btn btn-success" disabled={loading}>
                    <FaPaperPlane className="me-2" />
                    {loading ? "Đang xử lý..." : "Xác nhận mượn"}
                </button>

                {onClose && (
                    <button
                        type="button"
                        className="btn btn-outline-secondary ms-3"
                        onClick={onClose}
                        disabled={loading}
                    >
                        <FaTimes className="me-2" />
                        Hủy bỏ
                    </button>
                )}
            </div>
        </form>
    );
};

export default BorrowForm;
