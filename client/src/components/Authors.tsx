import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import { Author } from '../type';
import { apiClient } from '../api/axios';
import { useToast } from '../hooks/useToast';

const Authors: React.FC = () => {
    const showToast = useToast();
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [formData, setFormData] = useState<Partial<Author>>({
        authorName: ''
    });

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/authors', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.data.code === 1000) {
                setAuthors(response.data.result);
            } else {
                showToast.showToast("Lỗi khi lấy dữ liệu tác giả", "error");
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
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

    // Thêm tác giả
    const handleAddAuthor = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/authors', formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setShowAddModal(false);
                setFormData({ authorName: '' });
                fetchAuthors(); // Tải lại danh sách tác giả sau khi thêm
                showToast.showToast("Thêm tác giả thành công", "success");
            } else {
                showToast.showToast(`Thêm tác giả thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            console.error('Lỗi khi thêm tác giả:', error);
            showToast.showToast(`Lỗi khi thêm tác giả: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    // Cập nhật tác giả
    const handleUpdateAuthor = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAuthor) return;

        try {
            const response = await apiClient.put(`/authors/${selectedAuthor.authorId}`, formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setShowEditModal(false);
                fetchAuthors(); // Tải lại danh sách tác giả sau khi cập nhật
                showToast.showToast("Cập nhật tác giả thành công", "success");
            } else {
                showToast.showToast(`Cập nhật tác giả thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            console.error('Lỗi khi cập nhật tác giả:', error);
            showToast.showToast(`Lỗi khi cập nhật tác giả: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    // Xóa tác giả
    const handleDeleteAuthor = (author: Author) => {
        setSelectedAuthor(author);
        setShowDeleteModal(true);
    };

    // Xác nhận xóa tác giả
    const confirmDeleteAuthor = async () => {
        if (!selectedAuthor) return;

        try {
            const response = await apiClient.delete(`/authors/${selectedAuthor.authorId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setShowDeleteModal(false);
                fetchAuthors(); // Tải lại danh sách sau khi xóa
                showToast.showToast("Xóa tác giả thành công", "success");
            } else {
                showToast.showToast(`Xóa tác giả thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            console.error('Lỗi khi xóa tác giả:', error);
            showToast.showToast(`Lỗi khi xóa tác giả: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    // Lọc tác giả theo tên
    const filteredAuthors = authors.filter(author =>
        author.authorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Danh sách tác giả</h3>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    <i className="bi bi-plus-circle me-2"></i>Thêm tác giả
                </Button>
            </div>

            <div className="mb-3">
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <FormControl
                        placeholder="Tìm kiếm tác giả theo tên..."
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
                            <th>Tên tác giả</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAuthors.length > 0 ? (
                            filteredAuthors.map((author) => (
                                <tr key={author.authorId}>
                                    <td>{author.authorId}</td>
                                    <td>{author.authorName}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditAuthor(author)}>
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteAuthor(author)}>
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

            {/* Modal Thêm Tác giả */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm tác giả mới</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAddAuthor}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên tác giả</Form.Label>
                            <Form.Control
                                type="text"
                                name="authorName"
                                value={formData.authorName}
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
                            Thêm tác giả
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal Sửa Tác giả */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin tác giả</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdateAuthor}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên tác giả</Form.Label>
                            <Form.Control
                                type="text"
                                name="authorName"
                                value={formData.authorName}
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

            {/* Modal Xóa Tác giả */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa tác giả "{selectedAuthor?.authorName}" không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteAuthor}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Authors;
