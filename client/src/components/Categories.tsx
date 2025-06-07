import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import { Category } from '../type';
import { apiClient } from '../api/axios';
import { useToast } from '../hooks/useToast';

const Categories: React.FC = () => {
    const { showToast } = useToast();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [formData, setFormData] = useState<Partial<Category>>({
        categoryName: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/categories', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.data.code === 1000) {
                // Sắp xếp dữ liệu theo categoryId tăng dần
                const sortedCategories = response.data.result.sort((a: Category, b: Category) => a.categoryId - b.categoryId);
                setCategories(sortedCategories);
            } else {
                showToast("Lỗi khi lấy dữ liệu thể loại", "error");
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            showToast("Lỗi khi gọi API", "error");
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

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/categories', formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setShowAddModal(false);
                setFormData({ categoryName: '' });
                fetchCategories(); // Tải lại danh sách sau khi thêm
                showToast("Thêm thể loại thành công", "success");
            } else {
                showToast(`Thêm thể loại thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast(`Lỗi khi thêm thể loại: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleUpdateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) return;

        try {
            const response = await apiClient.put(`/categories/${selectedCategory.categoryId}`, formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setShowEditModal(false);
                fetchCategories(); // Tải lại danh sách sau khi cập nhật
                showToast("Cập nhật thể loại thành công", "success");
            } else {
                showToast(`Cập nhật thể loại thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast(`Lỗi khi cập nhật thể loại: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleDeleteCategory = (category: Category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const confirmDeleteCategory = async () => {
        if (!selectedCategory) return;

        try {
            const response = await apiClient.delete(`/categories/${selectedCategory.categoryId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.data.code === 1000) {
                setShowDeleteModal(false);
                fetchCategories(); // Tải lại danh sách sau khi xóa
                showToast("Xóa thể loại thành công", "success");
            } else {
                showToast(`Xóa thể loại thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast(`Lỗi khi xóa thể loại: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const filteredCategories = categories.filter(category =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Danh sách thể loại</h3>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    <i className="bi bi-plus-circle me-2"></i>Thêm thể loại
                </Button>
            </div>

            <div className="mb-3">
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <FormControl
                        placeholder="Tìm kiếm thể loại theo tên..."
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
                            <th>Tên thể loại</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <tr key={category.categoryId}>
                                    <td>{category.categoryId}</td>
                                    <td>{category.categoryName}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => {
                                            setSelectedCategory(category);
                                            setFormData({ categoryName: category.categoryName });
                                            setShowEditModal(true);
                                        }}>
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCategory(category)}>
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

            {/* Modal Thêm Thể loại */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thể loại mới</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAddCategory}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên thể loại</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoryName"
                                value={formData.categoryName}
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
                            Thêm thể loại
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal Sửa Thể loại */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin thể loại</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdateCategory}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên thể loại</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoryName"
                                value={formData.categoryName}
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

            {/* Modal Xóa Thể loại */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa thể loại "{selectedCategory?.categoryName}" không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteCategory}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Categories;
