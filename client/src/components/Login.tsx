import { useState } from 'react';
import axios from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';
import './Login.css';

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [signInData, setSignInData] = useState({
    userId: '',
    password: ''
  });
  const [adminData, setAdminData] = useState({
    userId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleUserSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
        userId: signInData.userId,
        password: signInData.password
      });
      localStorage.setItem('token', response.data.result.token);
      window.location.href = '/';
    } catch {
      setError('Mã sinh viên hoặc mật khẩu không đúng');
    }
  };

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
        userId: adminData.userId,
        password: adminData.password
      });
      localStorage.setItem('token', response.data.result.token);
      window.location.href = '/admin';
    } catch {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleAdminSignIn}>
          <h1>Đăng nhập với tư cách quản trị viên</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>hoặc sử dụng tài khoản quản trị</span>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={adminData.userId}
            onChange={(e) => setAdminData({ ...adminData, userId: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={adminData.password}
            onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
            required
          />
          <button type="submit">Đăng nhập</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleUserSignIn}>
          <h1>Đăng nhập với tư cách người dùng</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>hoặc sử dụng mã sinh viên</span>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            placeholder="Mã sinh viên"
            value={signInData.userId}
            onChange={(e) => setSignInData({ ...signInData, userId: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={signInData.password}
            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
            required
          />
          <a href="#">Quên mật khẩu?</a>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Xin chào!</h1>
            <p>Đăng nhập với tư cách người dùng để sử dụng các tính năng của thư viện</p>
            <button className="hidden" onClick={() => setIsActive(false)}>Đăng nhập người dùng</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Xin chào quản trị viên!</h1>
            <p>Đăng nhập với tư cách quản trị viên để quản lý hệ thống</p>
            <button className="hidden" onClick={() => setIsActive(true)}>Đăng nhập quản trị</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 