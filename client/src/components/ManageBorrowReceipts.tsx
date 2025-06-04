import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { BorrowBook, ReturnBook } from '../type';
import { apiClient } from '../api/axios';
import { useToast } from '../hooks/useToast';
import Pagination from './Pagination';

const ManageBorrowReceipts: React.FC = () => {
    const showToast = useToast();
    const [key, setKey] = useState<string>('request');
    const [borrowReceipts, setBorrowReceipts] = useState<BorrowBook[]>([]);
    const [returnReceipts, setReturnReceipts] = useState<ReturnBook[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showViewModal, setShowViewModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showAddReturnModal, setShowAddReturnModal] = useState<boolean>(false);
    const [selectedReceipt, setSelectedReceipt] = useState<BorrowBook | null>(null);
    const [selectedReturnReceipt, setSelectedReturnReceipt] = useState<ReturnBook | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [returnCurrentPage, setReturnCurrentPage] = useState<number>(1);
    const [returnTotalPages, setReturnTotalPages] = useState<number>(1);
    const itemsPerPage = 10;
    const [editFormData, setEditFormData] = useState({
        borrowReceiptId: '',
        borrowDate: '',
        dueDate: '',
        quantity: 1,
        userId: '',
        name: 'BINH-THUONG',
        statusReceiptName: 'PENDING',
        bookName: '',
        costBorrow: 0
    });
    const [returnFormData, setReturnFormData] = useState({
        borrowReceiptId: '',
        returnDate: new Date().toISOString().split('T')[0],
        statusBookName: 'Returned'
    });

    useEffect(() => {
        if (key === 'returns') {
            loadReturnData(returnCurrentPage, itemsPerPage);
        } else {
            loadBorrowData(currentPage, itemsPerPage);
        }
    }, [currentPage, returnCurrentPage, key]);

    const loadBorrowData = async (page: number, size: number) => {
        setLoading(true);
        try {
            // Xác định status filter dựa trên tab hiện tại
            let statusFilter = '';
            if (key !== 'all' && key !== 'returns') {
                statusFilter = key === 'request' ? 'PENDING' :
                    key === 'borrowed' ? 'APPROVED' :
                        key === 'returned' ? 'PAID' :
                            key === 'notpaid' ? 'UNPAID' :
                                key === 'denied' ? 'DENIED' : '';
            }

            // Tạo query params
            const queryParams = new URLSearchParams();
            queryParams.append('page', (page - 1).toString());
            queryParams.append('size', size.toString());
            if (statusFilter) {
                queryParams.append('status', statusFilter);
            }

            const response = await apiClient.get(`/borrow-receipts?${queryParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setBorrowReceipts(response.data.result);
                if (response.data.totalElements) {
                    setTotalPages(Math.ceil(response.data.totalElements / size));
                }
            } else {
                showToast.showToast("Lỗi khi lấy dữ liệu phiếu mượn", "error");
            }
        } catch (error) {
            showToast.showToast("Lỗi khi gọi API", "error");
            console.error("Lỗi tải dữ liệu phiếu mượn:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadReturnData = async (page: number, size: number) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('page', (page - 1).toString());
            queryParams.append('size', size.toString());

            const response = await apiClient.get(`/return-receipts?${queryParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setReturnReceipts(response.data.result);
                if (response.data.totalElements) {
                    setReturnTotalPages(Math.ceil(response.data.totalElements / size));
                }
            } else {
                showToast.showToast("Lỗi khi lấy dữ liệu phiếu trả", "error");
            }
        } catch (error) {
            showToast.showToast("Lỗi khi gọi API", "error");
            console.error("Lỗi tải dữ liệu phiếu trả:", error);
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
            statusReceiptName: receipt.statusReceiptName || 'PENDING',
            bookName: receipt.bookName || '',
            costBorrow: receipt.costBorrow || 0
        });
        setShowEditModal(true);
    };

    const handleDeleteReceipt = (receipt: BorrowBook) => {
        setSelectedReceipt(receipt);
        setShowDeleteModal(true);
    };

    const handleAddReturn = (receipt: BorrowBook) => {
        setSelectedReceipt(receipt);
        setReturnFormData({
            borrowReceiptId: receipt.borrowReceiptId,
            returnDate: new Date().toISOString().split('T')[0],
            statusBookName: 'Returned'
        });
        setShowAddReturnModal(true);
    };

    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReturnFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReturnFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiClient.put(`/borrow-receipts/${editFormData.borrowReceiptId}`, {
                ...editFormData,
                quantity: Number(editFormData.quantity)
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setShowEditModal(false);
                loadBorrowData(currentPage, itemsPerPage);
                showToast.showToast("Cập nhật thành công!", "success");
            } else {
                showToast.showToast(`Cập nhật thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi gửi dữ liệu: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleReturnFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiClient.post('/return-receipts', returnFormData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setShowAddReturnModal(false);
                // Cập nhật cả hai danh sách
                loadBorrowData(currentPage, itemsPerPage);
                loadReturnData(returnCurrentPage, itemsPerPage);
                showToast.showToast("Thêm phiếu trả thành công!", "success");
            } else {
                showToast.showToast(`Thêm phiếu trả thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi gửi dữ liệu: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedReceipt) return;

        try {
            const response = await apiClient.delete(`/borrow-receipts/${selectedReceipt.borrowReceiptId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            setShowDeleteModal(false);

            if (response.data.code === 1000) {
                loadBorrowData(currentPage, itemsPerPage);
                showToast.showToast("Xóa bản ghi thành công!", "success");
            } else {
                showToast.showToast(`Xóa thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi xóa: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const response = await apiClient.put(`/borrow-receipts/${id}`, {
                statusReceiptName: "APPROVED"
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                loadBorrowData(currentPage, itemsPerPage);
                showToast.showToast("Phê duyệt thành công!", "success");
            } else {
                showToast.showToast(`Phê duyệt thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi phê duyệt: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleDeny = async (id: string) => {
        try {
            const response = await apiClient.put(`/borrow-receipts/${id}`, {
                statusReceiptName: "DENIED"
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                loadBorrowData(currentPage, itemsPerPage);
                showToast.showToast("Từ chối thành công!", "success");
            } else {
                showToast.showToast(`Từ chối thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi từ chối: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const getStatusClassReceipt = (statusReceiptName: string) => {
        switch (statusReceiptName) {
            case "PENDING": return "bg-warning";
            case "APPROVED": return "bg-secondary";
            case "DENIED": return "bg-danger";
            case "PAID": return "bg-warning";
            case "UNPAID": return "bg-danger";
            default: return "bg-secondary";
        }
    };

    const getStatusClassBook = (statusName: string) => {
        switch (statusName) {
            case "Available": return "bg-success";
            case "Damaged": return "bg-warning";
            case "Lost": return "bg-danger";
            case "Returned": return "bg-success";
            case "Overdue": return "bg-danger";
            default: return "bg-secondary";
        }
    };

    const getStatusText = (statusReceiptName: string) => {
        switch (statusReceiptName) {
            case "APPROVED": return "Đã mượn";
            case "PENDING": return "Yêu cầu mượn";
            case "UNPAID": return "Chưa trả";
            case "DENIED": return "Từ chối";
            case "PAID": return "Đã trả";
            default: return statusReceiptName;
        }
    };

    const renderBorrowReceiptTable = (loading: boolean) => {
        if (loading) {
            return (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </Spinner>
                </div>
            );
        }

        return (
            <>
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
                        {borrowReceipts.length > 0 ? (
                            borrowReceipts.map((receipt) => (
                                <tr key={receipt.borrowReceiptId}>
                                    <td>{receipt.borrowReceiptId}</td>
                                    <td>{receipt.bookName}</td>
                                    <td>{receipt.userId}</td>
                                    <td>{receipt.borrowDate ? new Date(receipt.borrowDate).toLocaleDateString() : ''}</td>
                                    <td>{receipt.dueDate ? new Date(receipt.dueDate).toLocaleDateString() : ''}</td>
                                    <td>
                                        <span className={`badge ${getStatusClassReceipt(receipt.statusReceiptName)}`}>
                                            {getStatusText(receipt.statusReceiptName)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${getStatusClassBook(receipt.name)}`}>
                                            {receipt.name}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="outline-primary" size="sm" onClick={() => handleViewReceipt(receipt)}>
                                                <i className="bi bi-eye"></i>
                                            </Button>
                                            <Button variant="outline-success" size="sm" onClick={() => handleEditReceipt(receipt)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteReceipt(receipt)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                            {receipt.statusReceiptName === "PENDING" && (
                                                <>
                                                    <Button variant="outline-success" size="sm" onClick={() => handleApprove(receipt.borrowReceiptId)}>
                                                        <i className="bi bi-check2-circle"></i>
                                                    </Button>
                                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeny(receipt.borrowReceiptId)}>
                                                        <i className="bi bi-dash-circle"></i>
                                                    </Button>
                                                </>
                                            )}
                                            {receipt.statusReceiptName === "APPROVED" && (
                                                <Button variant="outline-info" size="sm" onClick={() => handleAddReturn(receipt)}>
                                                    <i className="bi bi-arrow-return-left"></i>
                                                </Button>
                                            )}
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

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    maxDisplayedPages={5}
                />
            </>
        );
    };

    const renderReturnReceiptTable = (loading: boolean) => {
        if (loading) {
            return (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </Spinner>
                </div>
            );
        }

        return (
            <>
                <table className="table table-bordered align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID Phiếu mượn</th>
                            <th>Ngày trả</th>
                            <th>Trạng thái sách</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnReceipts.length > 0 ? (
                            returnReceipts.map((receipt) => (
                                <tr key={receipt.returnReceiptId}>
                                    <td>{receipt.returnReceiptId}</td>
                                    <td>{receipt.borrowReceiptId}</td>
                                    <td>{receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : ''}</td>
                                    <td>
                                        <span className={`badge ${getStatusClassBook(receipt.statusBookName)}`}>
                                            {receipt.statusBookName}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Pagination
                    currentPage={returnCurrentPage}
                    totalPages={returnTotalPages}
                    onPageChange={setReturnCurrentPage}
                    maxDisplayedPages={5}
                />
            </>
        );
    };

    return (
        <div className="container">
            <h3 className="mb-4">Quản lý mượn trả sách</h3>

            <Tabs
                activeKey={key}
                onSelect={(k) => {
                    setKey(k || 'request');
                    if (k === 'returns') {
                        setReturnCurrentPage(1);
                    } else {
                        setCurrentPage(1);
                    }
                }}
                className="mb-3"
            >
                <Tab eventKey="request" title="Yêu cầu mượn">
                    {renderBorrowReceiptTable(loading)}
                </Tab>
                <Tab eventKey="borrowed" title="Đang mượn">
                    {renderBorrowReceiptTable(loading)}
                </Tab>
                <Tab eventKey="returned" title="Đã trả">
                    {renderBorrowReceiptTable(loading)}
                </Tab>
                <Tab eventKey="all" title="Tất cả phiếu mượn">
                    {renderBorrowReceiptTable(loading)}
                </Tab>
                <Tab eventKey="notpaid" title="Không thể trả">
                    {renderBorrowReceiptTable(loading)}
                </Tab>
                <Tab eventKey="denied" title="Từ chối">
                    {renderBorrowReceiptTable(loading)}
                </Tab>
                <Tab eventKey="returns" title="Phiếu trả">
                    {renderReturnReceiptTable(loading)}
                </Tab>
            </Tabs>

            {/* Modal Xem Chi tiết */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết phiếu mượn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered">
                        <tbody>
                            <tr><th>ID</th><td>{selectedReceipt?.borrowReceiptId}</td></tr>
                            <tr><th>Tên sách</th><td>{selectedReceipt?.bookName}</td></tr>
                            <tr><th>Người mượn</th><td>{selectedReceipt?.userId}</td></tr>
                            <tr><th>Thời gian mượn</th><td>{selectedReceipt?.borrowDate ? new Date(selectedReceipt.borrowDate).toLocaleDateString() : ''}</td></tr>
                            <tr><th>Thời gian hết hạn</th><td>{selectedReceipt?.dueDate ? new Date(selectedReceipt.dueDate).toLocaleDateString() : ''}</td></tr>
                            <tr><th>Số lượng</th><td>{selectedReceipt?.quantity}</td></tr>
                            <tr><th>Chi phí mượn</th><td>{selectedReceipt?.costBorrow?.toLocaleString('vi-VN') || 0} VNĐ</td></tr>
                            <tr><th>Trạng thái mượn</th><td>{getStatusText(selectedReceipt?.statusReceiptName || '')}</td></tr>
                            <tr><th>Trạng thái sách</th><td>{selectedReceipt?.name}</td></tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Chỉnh sửa */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Form onSubmit={handleEditFormSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chỉnh sửa phiếu mượn</Modal.Title>
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
                            <Form.Label>Tên sách</Form.Label>
                            <Form.Control
                                type="text"
                                name="bookName"
                                value={editFormData.bookName}
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
                                <option value="Damaged">Hư hỏng</option>
                                <option value="Lost">Mất</option>
                                <option value="Returned">Đã trả</option>
                                <option value="Overdue">Quá hạn</option>
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
                                <option value="PENDING">Yêu cầu mượn</option>
                                <option value="APPROVED">Đã mượn</option>
                                <option value="DENIED">Từ chối</option>
                                <option value="PAID">Đã trả</option>
                                <option value="UNPAID">Chưa trả</option>
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
                    Bạn có chắc muốn xóa phiếu mượn này không?
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

            {/* Modal Thêm phiếu trả */}
            <Modal show={showAddReturnModal} onHide={() => setShowAddReturnModal(false)} centered>
                <Form onSubmit={handleReturnFormSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm phiếu trả</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>ID Phiếu mượn</Form.Label>
                            <Form.Control
                                type="text"
                                name="borrowReceiptId"
                                value={returnFormData.borrowReceiptId}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày trả</Form.Label>
                            <Form.Control
                                type="date"
                                name="returnDate"
                                value={returnFormData.returnDate}
                                onChange={handleReturnFormChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái sách</Form.Label>
                            <Form.Select
                                name="statusBookName"
                                value={returnFormData.statusBookName}
                                onChange={handleReturnFormChange}
                                required
                            >
                                <option value="Returned">Trả bình thường</option>
                                <option value="Damaged">Hư hỏng</option>
                                <option value="Lost">Mất</option>
                                <option value="Overdue">Quá hạn</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddReturnModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="submit">
                            Thêm phiếu trả
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageBorrowReceipts;