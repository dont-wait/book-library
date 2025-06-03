// components/BorrowForm.tsx
import { useState } from "react";
import { apiClient } from "../api/axios";
import { Book } from "../type";
import { useToast } from "../hooks/useToast";

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
            userId: userId,
            name: "Available",           // Trạng thái sách mặc định
            statusReceiptName: "PENDING" // Trạng thái phiếu mượn mặc định
        };

        console.log("Payload gửi lên API:", payload);

        try {
            const response = await apiClient.post("/borrow-receipts", payload);
            console.log("Response từ API:", response.data);

            showToast("Tạo phiếu mượn thành công!", "success");
            onSuccess?.();
            onClose?.();
        } catch (error: any) {
            console.error("Lỗi khi tạo phiếu mượn:", error.response || error.message || error);
            showToast("Lỗi khi tạo phiếu mượn. Vui lòng kiểm tra lại dữ liệu và thử lại.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border rounded p-3 mt-4">
            <h5>Nhập thông tin mượn sách</h5>
            <div className="mb-2">
                <label className="form-label">Ngày mượn</label>
                <input
                    type="date"
                    className="form-control"
                    value={borrowDate}
                    onChange={(e) => setBorrowDate(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="form-label">Hạn trả</label>
                <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Số lượng</label>
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
            <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Đang gửi..." : "Tạo phiếu mượn"}
            </button>
            {onClose && (
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={onClose}
                    disabled={loading}
                >
                    Hủy
                </button>
            )}
        </form>
    );
};

export default BorrowForm;
