import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Modal, Button, Form } from 'react-bootstrap';
import { BorrowBook } from '../type';

interface ManageBorrowReceiptsProps {
    showNotification: (message: string, isError?: boolean) => void;
}

const ManageBorrowReceipts: React.FC<ManageBorrowReceiptsProps> = ({ showNotification }) => {
    const [key, setKey] = useState<string>('request');
    const [borrowReceipts, setBorrowReceipts] = useState<BorrowBook[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showViewModal, setShowViewModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedReceipt, setSelectedReceipt] = useState<BorrowBook | null>(null);
    const [editFormData, setEditFormData] = useState({
        borrowReceiptId: '',
        borrowDate: '',
        dueDate: '',
        quantity: 1,
        userId: '',
        name: 'BINH-THUONG',
        statusReceiptName: 'PENDING'
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:6969/api/v1/borrow-receipts');
            const json = await response.json();

            if (json.code !== 1000) {
                console.error("API trả về lỗi:", json.message);
                return;
            }

            setBorrowReceipts(json.result);
        } catch (err) {
            console.error("Lỗi tải dữ liệu:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleViewReceipt = (receipt: BorrowBook) => {
        setSelectedReceipt(receipt);
        setShowViewModal(true);
    };

    const handleEditReceipt = (receipt: BorrowBook) => {
        setSelectedReceipt(receipt);
        setEditFormData({
            borrowReceiptId: receipt.borrowReceiptId,
            borrowDate: receipt.borrowDate ? receipt.borrowDate.split('T')[0] : '',
            dueDate: receipt.dueDate ? receipt.dueDate.split('T')[0] : '',
            quantity: receipt.quantity || 1,
            userId: receipt.userId,
            name: receipt.name || 'BINH-THUONG',
            statusReceiptName: receipt.statusReceiptName || 'PENDING'
        });
        setShowEditModal(true);
    };

    const handleDeleteReceipt = (receipt: BorrowBook) => {
        setSelectedReceipt(receipt);
        setShowDeleteModal(true);
    };

    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:6969/api/v1/borrow-receipts/${editFormData.borrowReceiptId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...editFormData,
                    quantity: Number(editFormData.quantity)
                }),
                credentials: "include"
            });

            const result = await response.json();

            if (response.ok && result.message.toLowerCase().includes("success")) {
                setShowEditModal(false);
                loadData();
                showNotification("Cập nhật thành công!");
            } else {
                showNotification("Cập nhật thất bại: " + result.message, true);
            }
        } catch (error) {
            showNotification("Lỗi khi gửi dữ liệu: " + (error as Error).message, true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedReceipt) return;

        try {
            const response = await fetch(`http://localhost:6969/api/v1/borrow-receipts/${selectedReceipt.borrowReceiptId}`, {
                method: "DELETE",
                credentials: "include",
            });

            setShowDeleteModal(false);

            if (response.ok) {
                loadData();
                showNotification("Xóa bản ghi thành công!");
            } else {
                const result = await response.json();
                showNotification("Xóa thất bại: " + (result.message || response.statusText), true);
            }
        } catch (error) {
            showNotification("Lỗi khi xóa: " + (error as Error).message, true);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:6969/api/v1/borrow-receipts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    statusReceiptName: "APPROVED"
                }),
                credentials: "include"
            });

            if (response.ok) {
                await loadData();
                showNotification("Phê duyệt thành công!");
            } else {
                const result = await response.json();
                showNotification("Phê duyệt thất bại: " + (result.message || response.statusText), true);
            }
        } catch (error) {
            showNotification("Lỗi khi phê duyệt: " + (error as Error).message, true);
        }
    };

    const handleDeny = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:6969/api/v1/borrow-receipts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    statusReceiptName: "DENIED"
                }),
                credentials: "include"
            });

            if (response.ok) {
                await loadData();
                showNotification("Từ chối thành công!");
            } else {
                const result = await response.json();
                showNotification("Từ chối thất bại: " + (result.message || response.statusText), true);
            }
        } catch (error) {
            showNotification("Lỗi khi từ chối: " + (error as Error).message, true);
        }
    };

    const getFilteredReceipts = (status: string) => {
        if (status === 'all') return borrowReceipts;
        return borrowReceipts.filter(receipt => receipt.statusReceiptName === status.toUpperCase());
    };

    const getStatusClassReceipt = (statusReceiptName: string) => {
        if (statusReceiptName === "PENDING") return "border-primary text-primary";
        if (statusReceiptName === "APPROVED") return "border-success text-success";
        if (statusReceiptName === "DENIED") return "border-danger text-danger";
        if (statusReceiptName === "PAID") return "border-warning text-warning";
        if (statusReceiptName === "NOTPAID") return "border-danger text-danger";
        return "border-secondary text-secondary";
    };

    const getStatusClassBook = (statusName: string) => {
        if (statusName === "MOI-NHAP") return "border-success text-success";
        if (statusName === "BINH-THUONG") return "border-warning text-warning";
        if (statusName === "HET-HANG") return "border-danger text-danger";
        return "border-secondary text-secondary";
    };

    const getStatusText = (statusReceiptName: string) => {
        if (statusReceiptName === "APPROVED") return "Đã mượn";
        if (statusReceiptName === "PENDING") return "Yêu cầu mượn";
        if (statusReceiptName === "PAID") return "Đã trả";
        if (statusReceiptName === "NOTPAID") return "Không thể trả";
        if (statusReceiptName === "DENIED") return "Từ chối";
        return statusReceiptName;
    };

    const renderBorrowReceiptTable = (receipts: BorrowBook[], loading: boolean) => {
        if (loading) {
            return (
                <div className="text-center p-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            <table className="table table-bordered align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sách</th>
                        <th>Người mượn</th>
                        <th>Thời gian mượn</th>
                        <th>Thời gian hết hạn</th>
                        <th>Trạng thái mượn</th>
                        <th>Trạng thái sách</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.length > 0 ? (
                        receipts.map((receipt) => (
                            <tr key={receipt.borrowReceiptId}>
                                <td>{receipt.borrowReceiptId}</td>
                                <td>{receipt.bookName}</td>
                                <td>{receipt.userId}</td>
                                <td>{receipt.borrowDate}</td>
                                <td>{receipt.dueDate}</td>
                                <td>
                                    <button className={`btn btn-status ${getStatusClassReceipt(receipt.statusReceiptName)}`}>
                                        {getStatusText(receipt.statusReceiptName)}
                                    </button>
                                </td>
                                <td>
                                    <button className={`btn btn-status ${getStatusClassBook(receipt.name)}`}>
                                        {receipt.name}
                                    </button>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-link text-decoration-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            ⋮
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item d-flex" href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleViewReceipt(receipt);
                                                }}>
                                                    <i className="bi bi-eye me-3 text-success"></i>Xem
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item d-flex" href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEditReceipt(receipt);
                                                }}>
                                                    <i className="bi bi-pencil me-3 text-primary"></i>Sửa
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item d-flex" href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDeleteReceipt(receipt);
                                                }}>
                                                    <i className="bi bi-trash me-3 text-danger"></i>Xóa
                                                </a>
                                            </li>
                                            {receipt.statusReceiptName === "PENDING" && (
                                                <>
                                                    <li>
                                                        <a className="dropdown-item d-flex" href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            handleApprove(receipt.borrowReceiptId);
                                                        }}>
                                                            <i className="bi bi-check2-circle me-3 text-success"></i>Phê duyệt
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item d-flex" href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeny(receipt.borrowReceiptId);
                                                        }}>
                                                            <i className="bi bi-dash-circle me-3 text-danger"></i>Từ chối
                                                        </a>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    };

    return (
        <div className="container">
            <h3 className="mb-4">Quản lý mượn trả sách</h3>

            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k || 'request')}
                className="mb-3"
            >
                <Tab eventKey="request" title="Yêu cầu mượn">
                    {renderBorrowReceiptTable(getFilteredReceipts('PENDING'), loading)}
                </Tab>
                <Tab eventKey="borrowed" title="Đang mượn">
                    {renderBorrowReceiptTable(getFilteredReceipts('APPROVED'), loading)}
                </Tab>
                <Tab eventKey="returned" title="Đã trả">
                    {renderBorrowReceiptTable(getFilteredReceipts('PAID'), loading)}
                </Tab>
                <Tab eventKey="all" title="Tất cả">
                    {renderBorrowReceiptTable(getFilteredReceipts('all'), loading)}
                </Tab>
                <Tab eventKey="notpaid" title="Không thể trả">
                    {renderBorrowReceiptTable(getFilteredReceipts('NOTPAID'), loading)}
                </Tab>
                <Tab eventKey="denied" title="Từ chối">
                    {renderBorrowReceiptTable(getFilteredReceipts('DENIED'), loading)}
                </Tab>
            </Tabs>

            {/* Modal Xem Chi tiết */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết bản ghi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered">
                        <tbody>
                            <tr><th>ID</th><td>{selectedReceipt?.borrowReceiptId}</td></tr>
                            <tr><th>Tên sách</th><td>{selectedReceipt?.bookName}</td></tr>
                            <tr><th>Người mượn</th><td>{selectedReceipt?.userId}</td></tr>
                            <tr><th>Thời gian mượn</th><td>{selectedReceipt?.borrowDate}</td></tr>
                            <tr><th>Thời gian hết hạn</th><td>{selectedReceipt?.dueDate}</td></tr>
                            <tr><th>Số lượng</th><td>{selectedReceipt?.quantity}</td></tr>
                            <tr><th>Chi phí mượn</th><td>{selectedReceipt?.costBorrow.toLocaleString('vi-VN')} VNĐ</td></tr>
                            <tr><th>Trạng thái mượn</th><td>{getStatusText(selectedReceipt?.statusReceiptName || '')}</td></tr>
                            <tr><th>Trạng thái sách</th><td>{selectedReceipt?.name}</td></tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>

            {/* Modal Chỉnh sửa */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Form onSubmit={handleEditFormSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chỉnh sửa bản ghi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="hidden" name="borrowReceiptId" value={editFormData.borrowReceiptId} />

                        <Form.Group className="mb-3">
                            <Form.Label>Người mượn</Form.Label>
                            <Form.Control
                                type="text"
                                name="userId"
                                value={editFormData.userId}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Thời gian mượn</Form.Label>
                            <Form.Control
                                type="date"
                                name="borrowDate"
                                value={editFormData.borrowDate}
                                onChange={handleEditFormChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Thời gian hết hạn</Form.Label>
                            <Form.Control
                                type="date"
                                name="dueDate"
                                value={editFormData.dueDate}
                                onChange={handleEditFormChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={editFormData.quantity}
                                onChange={handleEditFormChange}
                                required
                                min="1"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái sách</Form.Label>
                            <Form.Select
                                name="name"
                                value={editFormData.name}
                                onChange={handleEditFormChange}
                                required
                            >
                                <option value="BINH-THUONG">Bình thường</option>
                                <option value="MOI-NHAP">Mới nhập</option>
                                <option value="HET-HANG">Hết hàng</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái mượn</Form.Label>
                            <Form.Select
                                name="statusReceiptName"
                                value={editFormData.statusReceiptName}
                                onChange={handleEditFormChange}
                                required
                            >
                                <option value="APPROVED">APPROVED</option>
                                <option value="DENIED">DENIED</option>
                                <option value="NOTPAID">NOTPAID</option>
                                <option value="PAID">PAID</option>
                                <option value="PENDING">PENDING</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="submit">
                            Lưu thay đổi
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal Xác nhận xóa */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa bản ghi này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageBorrowReceipts;