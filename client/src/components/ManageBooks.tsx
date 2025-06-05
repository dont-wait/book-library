import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import { Book, Publisher, Category, Author } from '../type';
import { apiClient } from '../api/axios';
import { useToast } from '../hooks/useToast';
import Pagination from './Pagination'; // Đảm bảo đường dẫn đúng với file Pagination của bạn

const ManageBooks: React.FC = () => {
    const showToast = useToast();
    const [books, setBooks] = useState<Book[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    // PHÂN TRANG
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const [formData, setFormData] = useState<Partial<Book & {
        authorId?: number;
        publisherId?: number;
        categoryId?: number;
    }>>({
        bookName: '',
        cost: 0,
        description: '',
        bookImageURL: '',
        quantity: 1,
        isbn: '',
        publicationDate: '',
        rating: 0,
        floorPosition: '',
        authorId: undefined,
        publisherId: undefined,
        categoryId: undefined,
    });

    useEffect(() => {
        fetchBooks();
        fetchPublishers();
        fetchCategories();
        fetchAuthors();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/books`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
                params: {
                    size: 1000
                }
            });
            if (response.data.code === 1000) {
                setBooks(response.data.result);
            } else {
                showToast.showToast("Lỗi khi lấy dữ liệu sách", "error");
            }
        } catch (error) {
            showToast.showToast("Lỗi khi gọi API", "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchPublishers = async () => {
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
            showToast.showToast("Lỗi khi gọi API nhà xuất bản", "error");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await apiClient.get('/categories', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.data.code === 1000) {
                setCategories(response.data.result);
            } else {
                showToast.showToast("Lỗi khi lấy dữ liệu thể loại", "error");
            }
        } catch (error) {
            showToast.showToast("Lỗi khi gọi API thể loại", "error");
        }
    };

    const fetchAuthors = async () => {
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
            showToast.showToast("Lỗi khi gọi API tác giả", "error");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' || name === 'cost' || name === 'quantity' || name === 'rating'
                ? Number(value)
                : value
        });
    };

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        const requestData = {
            ...formData,
            cost: Number(formData.cost),
            quantity: Number(formData.quantity),
            rating: Number(formData.rating),
            publicationDate: formData.publicationDate ? formData.publicationDate : null,
            floorPosition: formData.floorPosition ? formData.floorPosition : null,
        };
        console.log("Adding book with data:", requestData); // Log request data
        try {
            const response = await apiClient.post(`/books`, requestData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            console.log("Add response:", response.data); // Log response data
            if (response.data.code === 1000) {
                setShowAddModal(false);
                setFormData({
                    bookName: '',
                    cost: 0,
                    description: '',
                    bookImageURL: '',
                    quantity: 1,
                    isbn: '',
                    publicationDate: '',
                    rating: 0,
                    floorPosition: '',
                    authorId: undefined,
                    publisherId: undefined,
                    categoryId: undefined,
                });
                fetchBooks(); // Cập nhật danh sách sách
                showToast.showToast("Thêm sách thành công", "success");
            } else {
                showToast.showToast(`Thêm sách thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi thêm sách: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleEditBook = (book: Book) => {
        setSelectedBook(book);
        setFormData({
            bookName: book.bookName,
            cost: book.cost,
            description: book.description,
            bookImageURL: book.bookImageURL,
            quantity: book.quantity,
            isbn: book.isbn,
            publicationDate: book.publicationDate ? book.publicationDate.slice(0, 10) : '',
            rating: book.rating,
            floorPosition: book.floorPosition,
            authorId: book.authorId,
            publisherId: book.publisherId,
            categoryId: book.categoryId,
        });
        setShowEditModal(true);
    };

    const handleUpdateBook = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBook) return;
        const requestData = {
            ...formData,
            cost: Number(formData.cost),
            quantity: Number(formData.quantity),
            rating: Number(formData.rating),
            publicationDate: formData.publicationDate ? formData.publicationDate : null,
            floorPosition: formData.floorPosition ? formData.floorPosition : null,
        };
        console.log("Updating book with data:", requestData); // Log request data
        try {
            const response = await apiClient.put(`/books/${selectedBook.bookId}`, requestData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            console.log("Update response:", response.data); // Log response data
            if (response.data.code === 1000) {
                setShowEditModal(false);
                fetchBooks(); // Cập nhật danh sách sách
                showToast.showToast("Cập nhật sách thành công", "success");
            } else {
                showToast.showToast(`Cập nhật sách thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi cập nhật sách: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    const handleDeleteBook = (book: Book) => {
        setSelectedBook(book);
        setShowDeleteModal(true);
    };

    const confirmDeleteBook = async () => {
        if (!selectedBook) return;

        try {
            const response = await apiClient.delete(`/books/${selectedBook.bookId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            console.log("Delete response:", response.data); // Log response data
            if (response.data.code === 1000) {
                setShowDeleteModal(false);
                fetchBooks(); // Cập nhật danh sách sách
                showToast.showToast("Xóa sách thành công", "success");
            } else {
                showToast.showToast(`Xóa sách thất bại: ${response.data.message}`, "error");
            }
        } catch (error: any) {
            showToast.showToast(`Lỗi khi xóa sách: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    // PHÂN TRANG: Tính toán danh sách sách theo trang
    const filteredBooks = books.filter(book =>
        book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.publisherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredBooks.length / pageSize);

    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Quản lý sách</h3>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    <i className="bi bi-plus-circle me-2"></i>Thêm sách mới
                </Button>
            </div>

            <div className="mb-3">
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <FormControl
                        placeholder="Tìm kiếm sách theo tên, tác giả, nhà xuất bản, thể loại..."
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
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Nhà xuất bản</th>
                                <th>Thể loại</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>ISBN</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedBooks.length > 0 ? (
                                paginatedBooks.map((book) => (
                                    <tr key={book.bookId}>
                                        <td>{book.bookId}</td>
                                        <td>{book.bookName}</td>
                                        <td>{book.authorName}</td>
                                        <td>{book.publisherName}</td>
                                        <td>{book.categoryName}</td>
                                        <td>{book.cost.toLocaleString('vi-VN')} VNĐ</td>
                                        <td>{book.quantity}</td>
                                        <td>{book.isbn}</td>
                                        <td>
                                            <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditBook(book)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteBook(book)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center">Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}

            {/* Modal Thêm Sách */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sách mới</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAddBook}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên sách</Form.Label>
                            <Form.Control
                                type="text"
                                name="bookName"
                                value={formData.bookName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Tác giả</Form.Label>
                                    <Form.Select
                                        name="authorId"
                                        value={formData.authorId || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">-- Chọn tác giả --</option>
                                        {authors.map(author => (
                                            <option key={author.authorId} value={author.authorId}>
                                                {author.authorName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Nhà xuất bản</Form.Label>
                                    <Form.Select
                                        name="publisherId"
                                        value={formData.publisherId || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">-- Chọn nhà xuất bản --</option>
                                        {publishers.map(publisher => (
                                            <option key={publisher.publisherId} value={publisher.publisherId}>
                                                {publisher.publisherName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Thể loại</Form.Label>
                                    <Form.Select
                                        name="categoryId"
                                        value={formData.categoryId || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">-- Chọn thể loại --</option>
                                        {categories.map(category => (
                                            <option key={category.categoryId} value={category.categoryId}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="isbn"
                                        value={formData.isbn}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cost"
                                        value={formData.cost}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Ngày xuất bản</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="publicationDate"
                                        value={formData.publicationDate || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Vị trí</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="floorPosition"
                                        value={formData.floorPosition || ''}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: Tầng 2, Kệ A3"
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Đánh giá</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label>URL Hình ảnh</Form.Label>
                            <Form.Control
                                type="text"
                                name="bookImageURL"
                                value={formData.bookImageURL}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="submit">
                            Thêm sách
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal Sửa Sách */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin sách</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdateBook}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên sách</Form.Label>
                            <Form.Control
                                type="text"
                                name="bookName"
                                value={formData.bookName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Tác giả</Form.Label>
                                    <Form.Select
                                        name="authorId"
                                        value={formData.authorId || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">-- Chọn tác giả --</option>
                                        {authors.map(author => (
                                            <option key={author.authorId} value={author.authorId}>
                                                {author.authorName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Nhà xuất bản</Form.Label>
                                    <Form.Select
                                        name="publisherId"
                                        value={formData.publisherId || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">-- Chọn nhà xuất bản --</option>
                                        {publishers.map(publisher => (
                                            <option key={publisher.publisherId} value={publisher.publisherId}>
                                                {publisher.publisherName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Thể loại</Form.Label>
                                    <Form.Select
                                        name="categoryId"
                                        value={formData.categoryId || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">-- Chọn thể loại --</option>
                                        {categories.map(category => (
                                            <option key={category.categoryId} value={category.categoryId}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="isbn"
                                        value={formData.isbn}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cost"
                                        value={formData.cost}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Ngày xuất bản</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="publicationDate"
                                        value={formData.publicationDate || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Vị trí</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="floorPosition"
                                        value={formData.floorPosition || ''}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: Tầng 2, Kệ A3"
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Đánh giá</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label>URL Hình ảnh</Form.Label>
                            <Form.Control
                                type="text"
                                name="bookImageURL"
                                value={formData.bookImageURL}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
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

            {/* Modal Xóa Sách */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sách "{selectedBook?.bookName}" không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteBook}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageBooks;