import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spinner, InputGroup, FormControl } from 'react-bootstrap';

const BookSearchModal: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        bookName: '',
        manualAuthor: '',
        manualCategory: '',
        isbn: '',
        publicationDate: '',
        rating: '',
        floorPosition: '',
        publisherIds: '',
        categoryIds: '',
        authorIds: []
    });
    const [loading, setLoading] = useState(false);
    const [authors, setAuthors] = useState<any[]>([]);
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const token = 'your_token_here'; // Replace with actual token

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await fetch('http://localhost:6969/api/v1/authors', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });
            const data = await response.json();
            if (data.code === 1000) {
                setAuthors(data.result);
            } else {
                console.error('Failed to fetch authors');
            }
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            bookName: formData.bookName,
            isbn: formData.isbn,
            publicationDate: formData.publicationDate,
            rating: parseFloat(formData.rating),
            floorPosition: formData.floorPosition,
            publisherIds: formData.publisherIds.split(',').map(id => id.trim()),
            categoryIds: [
                ...formData.categoryIds.split(',').map(id => id.trim()),
                formData.manualCategory.trim()
            ].filter(Boolean),
            authorIds: [
                ...formData.authorIds,
                formData.manualAuthor.trim()
            ].filter(Boolean)
        };

        try {
            const response = await fetch("http://localhost:6969/api/v1/books/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            let resultHTML = '';
            if (Array.isArray(result)) {
                result.forEach(book => {
                    resultHTML += `<strong>Tên sách:</strong> ${book.bookName || "Không rõ"}<br>`;
                    if (book.authors && Array.isArray(book.authors)) {
                        const authorNames = book.authors.map((author: any) => author.name).join(", ");
                        resultHTML += `<strong>Tác giả:</strong> ${authorNames}<br><br>`;
                    } else {
                        resultHTML += `<strong>Tác giả:</strong> Không có thông tin<br><br>`;
                    }
                });
            } else {
                resultHTML = "Không có kết quả phù hợp.";
            }
            setResult(resultHTML);
            setShowResult(true);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setShowResult(false); // Reset result when closing the modal
    };

    const handleShow = () => setShowModal(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Tìm kiếm sách
            </Button>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tìm Kiếm Sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSearchSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Tên sách</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bookName"
                                    value={formData.bookName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Tác giả</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="manualAuthor"
                                    value={formData.manualAuthor}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Thể loại</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="manualCategory"
                                    value={formData.manualCategory}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">ISBN</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="isbn"
                                    value={formData.isbn}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Ngày xuất bản</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="publicationDate"
                                    value={formData.publicationDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Đánh giá</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Vị trí</label>
                            <input
                                type="text"
                                className="form-control"
                                name="floorPosition"
                                value={formData.floorPosition}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label className="form-label">Publisher IDs</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="publisherIds"
                                    value={formData.publisherIds}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Category IDs</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="categoryIds"
                                    value={formData.categoryIds}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Tác giả tìm kiếm</label>
                                <select
                                    id="authorSelect"
                                    className="form-select"
                                    multiple
                                    value={formData.authorIds}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        authorIds: Array.from(e.target.selectedOptions).map(opt => opt.value)
                                    })}
                                >
                                    {authors.map((author) => (
                                        <option key={author.id} value={author.id}>
                                            {author.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                                Tìm kiếm
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {loading && (
                <div className="text-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </Spinner>
                </div>
            )}

            {showResult && (
                <div className="mt-4" id="resultContainer">
                    <h5>Kết quả tìm kiếm:</h5>
                    <div
                        id="result"
                        className="bg-white p-3 border rounded"
                        dangerouslySetInnerHTML={{ __html: result }}
                    />
                </div>
            )}
        </>
    );
};

export default BookSearchModal;
