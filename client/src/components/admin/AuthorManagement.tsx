import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../api/endpoints';
import axios from '../../api/axios';

interface Author {
  id: string;
  name: string;
  biography: string;
}

const AuthorManagement = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.ADMIN.GET_ALL_AUTHORS);
        setAuthors(response.data);
        setLoading(false);
      } catch {
        setError('Không thể tải danh sách tác giả');
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="management-section">
      <h2>Danh sách tác giả</h2>
      <button className="add-btn">Thêm tác giả mới</button>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên tác giả</th>
              <th>Thông tin</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.biography}</td>
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

export default AuthorManagement; 