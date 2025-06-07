import { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { BorrowBook } from "../type";
import { apiClient } from "../api/axios";
import { format } from "date-fns";
import { useToast } from "../hooks/useToast";
import { response } from "express";

interface EditBorrowModalProps {
    show: boolean;
    borrow: BorrowBook;
    onClose: () => void;
    onSuccess: () => void;
}

const EditBorrowModal = ({ show, borrow, onClose, onSuccess }: EditBorrowModalProps) => {
    const { showToast } = useToast();
    const [borrowDate, setBorrowDate] = useState<string>(
        borrow.borrowDate ? format(new Date(borrow.borrowDate), "yyyy-MM-dd") : ""
    );
    const [dueDate, setDueDate] = useState<string>(
        borrow.dueDate ? format(new Date(borrow.dueDate), "yyyy-MM-dd") : ""
    );
    const [quantity, setQuantity] = useState<number>(borrow.quantity);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        if (!borrowDate) {
            showToast("Vui lòng chọn ngày mượn", "info");
            return;
        }
        if (!dueDate) {
            showToast("Vui lòng chọn ngày trả", "info");
        }
        if (quantity <= 0) {
            showToast("Số lượng phải lớn hơn 0", "info");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.put(`/borrow-receipts/${borrow.borrowReceiptId}`, {
                ...borrow,
                borrowDate,
                dueDate,
                quantity,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
                }
            });
            onSuccess();
            if (response)
                showToast("Cập nhật thành công", "success");
        } catch (err) {
            showToast(`Cập nhật thất bại, vui lòng thử lại ngày giờ theo quy định`, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa phiếu mượn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Form.Group controlId="borrowDate" className="mb-3">
                        <Form.Label>Ngày mượn</Form.Label>
                        <Form.Control
                            type="date"
                            value={borrowDate}
                            onChange={(e) => setBorrowDate(e.target.value)}
                            max={format(new Date(), "yyyy-MM-dd")}
                        />
                    </Form.Group>
                    <Form.Group controlId="dueDate" className="mb-3">
                        <Form.Label>Ngày trả</Form.Label>
                        <Form.Control
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={borrowDate}  // Đảm bảo ngày trả không sớm hơn ngày mượn
                        />
                    </Form.Group>
                    <Form.Group controlId="quantity">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Lưu"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditBorrowModal;
