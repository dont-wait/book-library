import React, { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';

interface BorrowReceipt {
    borrowReceiptId: string;
    bookId: string;
    bookName: string;
    userId: string;
    borrowDate: string;
    dueDate: string;
    quantity: number;
    statusName: string;
    statusReceiptName: string;
    name: string;
}

interface BorrowReceiptTableProps {
    receipts: BorrowReceipt[];
    onView: (receipt: BorrowReceipt) => void;
    onEdit: (receipt: BorrowReceipt) => void;
    onDelete: (receipt: BorrowReceipt) => void;
    onApprove: (id: string) => void;
    onDeny: (id: string) => void;
    loading: boolean;
}

const BorrowReceiptTable: React.FC<BorrowReceiptTableProps> = ({
    receipts,
    onView,
    onEdit,
    onDelete,
    onApprove,
    onDeny,
    loading
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showSearch, setShowSearch] = useState<boolean>(false);

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

    const filteredReceipts = receipts.filter(receipt => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            receipt.borrowReceiptId.toLowerCase().includes(term) ||
            receipt.bookId.toLowerCase().includes(term) ||
            receipt.userId.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <div className="filter-wrapper position-relative d-flex justify-content-end mb-3">
                <Button
                    className="filter-btn d-flex align-items-center"
                    onClick={() => setShowSearch(!showSearch)}
                >
                    Lọc
                    <i className="bi bi-filter ms-3"></i>
                </Button>
                {showSearch && (
                    <input
                        type="text"
                        className="search-box form-control position-absolute"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ display: 'block' }}
                    />
                )}
            </div>

            {loading ? (
                <div className="text-center p-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <table className="table table-bordered align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID sách</th>
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
                        {filteredReceipts.length > 0 ? (
                            filteredReceipts.map((receipt) => (
                                <tr key={receipt.borrowReceiptId}>
                                    <td>{receipt.borrowReceiptId}</td>
                                    <td>{receipt.bookId}</td>
                                    <td className="small">{receipt.bookName}</td>
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
                                    <td className="text-center">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="link" className="text-decoration-none">
                                                ⋮
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => onView(receipt)}>
                                                    <i className="bi bi-eye me-3 text-success"></i>Xem
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => onEdit(receipt)}>
                                                    <i className="bi bi-pencil me-3 text-primary"></i>Sửa
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => onDelete(receipt)}>
                                                    <i className="bi bi-trash me-3 text-danger"></i>Xóa
                                                </Dropdown.Item>
                                                {receipt.statusReceiptName === "PENDING" && (
                                                    <>
                                                        <Dropdown.Item onClick={() => onApprove(receipt.borrowReceiptId)}>
                                                            <i className="bi bi-check2-circle me-3 text-success"></i>Phê duyệt
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => onDeny(receipt.borrowReceiptId)}>
                                                            <i className="bi bi-dash-circle me-3 text-danger"></i>Từ chối
                                                        </Dropdown.Item>
                                                    </>
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default BorrowReceiptTable;