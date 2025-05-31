import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../api/endpoints';
import axios from '../../api/axios';

interface Category {
  id: string;
  name: string;
  description: string;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.ADMIN.GET_ALL_CATEGORIES);
        setCategories(response.data);
        setLoading(false);
      } catch {
        setError('Không thể tải danh sách thể loại');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="management-section">
      <h2>Danh sách thể loại</h2>
      <button className="add-btn">Thêm thể loại mới</button>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên thể loại</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
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

export default CategoryManagement; 