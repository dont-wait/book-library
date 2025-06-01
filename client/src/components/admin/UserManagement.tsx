import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../api/endpoints';
import axios from '../../api/axios';

interface User {
  id: string;
  username: string;
  role: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.ADMIN.GET_ALL_USERS);
        setUsers(response.data);
        setLoading(false);
      } catch {
        setError('Không thể tải danh sách người dùng');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="management-section">
      <h2>Danh sách người dùng</h2>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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

export default UserManagement; 