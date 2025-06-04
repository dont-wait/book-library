import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import { Publisher } from '../type';
import { apiClient } from '../api/axios';
import { useToast } from '../hooks/useToast';

const Publishers: React.FC = () => {
    const showToast = useToast();
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [formData, setFormData] = useState<Partial<Publisher>>({
        publisherName: ''
    });

    // Tải dữ liệu nhà xuất bản một lần khi component được mount
    useEffect(() => {
        fetchPublishers();
    }, []);

    const fetchPublishers = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/publishers', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.data.code === 1000) {
                setPublishers(response.data.result);
            } else {
                showToast.showToast("Lỗi khi lấy dữ liệu nhà xuất bản", "error");
            }
        } catch (error) {
            showToast.showToast("Lỗi khi gọi API", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddPublisher = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/publishers', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (response.data.code === 1000) {
                setShowAddModal(false);
                setFormData({
                    publisherName: ''
                });
                fetchPublishers();  // Tải lại dữ liệu sau khi thêm nhà xuất bản
                showToast.showToast("Thêm nhà xuất bản thành công", "success");
            } else {
                showToast.showToast(`Thêm nhà xuất bản thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi thêm nhà xuất bản: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleEditPublisher = (publisher: Publisher) => {
        setSelectedPublisher(publisher);
        setFormData({
            publisherName: publisher.publisherName
        });
        setShowEditModal(true);
    };

    const handleUpdatePublisher = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPublisher) return;

        try {
            const response = await apiClient.put(`/publishers/${selectedPublisher.publisherId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (response.data.code === 1000) {
                setShowEditModal(false);
                fetchPublishers();  // Tải lại dữ liệu sau khi cập nhật
                showToast.showToast("Cập nhật nhà xuất bản thành công", "success");
            } else {
                showToast.showToast(`Cập nhật nhà xuất bản thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi cập nhật nhà xuất bản: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleDeletePublisher = (publisher: Publisher) => {
        setSelectedPublisher(publisher);
        setShowDeleteModal(true);
    };

    const confirmDeletePublisher = async () => {
        if (!selectedPublisher) return;

        try {
            const response = await apiClient.delete(`/publishers/${selectedPublisher.publisherId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (response.data.code === 1000) {
                setShowDeleteModal(false);
                fetchPublishers();  // Tải lại dữ liệu sau khi xóa
                showToast.showToast("Xóa nhà xuất bản thành công", "success");
            } else {
                showToast.showToast(`Xóa nhà xuất bản thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi xóa nhà xuất bản: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const filteredPublishers = publishers.filter(publisher =>
        publisher.publisherName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Quản lý nhà xuất bản</h3>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    <i className="bi bi-plus-circle me-2"></i>Thêm nhà xuất bản
                </Button>
            </div>

            <div className="mb-3">
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <FormControl
                        placeholder="Tìm kiếm nhà xuất bản..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>

            {loading ? (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </Spinner>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên nhà xuất bản</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPublishers.length > 0 ? (
                            filteredPublishers.map((publisher) => (
                                <tr key={publisher.publisherId}>
                                    <td>{publisher.publisherId}</td>
                                    <td>{publisher.publisherName}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditPublisher(publisher)}>
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeletePublisher(publisher)}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}

            {/* Modal Thêm Nhà xuất bản */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm nhà xuất bản mới</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAddPublisher}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên nhà xuất bản</Form.Label>
                            <Form.Control
                                type="text"
                                name="publisherName"
                                value={formData.publisherName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="submit">
                            Thêm nhà xuất bản
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal Sửa Nhà xuất bản */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin nhà xuất bản</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdatePublisher}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên nhà xuất bản</Form.Label>
                            <Form.Control
                                type="text"
                                name="publisherName"
                                value={formData.publisherName}
                                onChange={handleInputChange}
                                required
                            />
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

            {/* Modal Xóa Nhà xuất bản */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa nhà xuất bản "{selectedPublisher?.publisherName}" không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDeletePublisher}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Publishers;
