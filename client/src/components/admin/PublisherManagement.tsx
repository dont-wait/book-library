import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../api/endpoints';
import axios from '../../api/axios';

interface Publisher {
  id: string;
  name: string;
  address: string;
}

const PublisherManagement = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.ADMIN.GET_ALL_PUBLISHERS);
        setPublishers(response.data);
        setLoading(false);
      } catch {
        setError('Không thể tải danh sách nhà xuất bản');
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="management-section">
      <h2>Danh sách nhà xuất bản</h2>
      <button className="add-btn">Thêm nhà xuất bản mới</button>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên nhà xuất bản</th>
              <th>Địa chỉ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((publisher) => (
              <tr key={publisher.id}>
                <td>{publisher.id}</td>
                <td>{publisher.name}</td>
                <td>{publisher.address}</td>
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

export default PublisherManagement; 