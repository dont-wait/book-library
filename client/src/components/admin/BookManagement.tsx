import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../api/endpoints';
import axios from '../../api/axios';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  available: boolean;
}

const BookManagement = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.ADMIN.GET_ALL_BOOKS);
        setBooks(response.data);
        setLoading(false);
      } catch {
        setError('Không thể tải danh sách sách');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="management-section">
      <h2>Danh sách sách</h2>
      <button className="add-btn">Thêm sách mới</button>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>Nhà xuất bản</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.publisher}</td>
                <td>{book.available ? 'Có sẵn' : 'Đã mượn'}</td>
                <td>
                  <button className="edit-btn">Sửa</button>
                  <button className="delete-btn">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement; 