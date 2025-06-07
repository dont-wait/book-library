import { useState } from 'react';
import { apiClient } from '../../api/axios'; // Adjust the path according to your project structure
import './Login.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { jwtDecode } from 'jwt-decode'
import { useUserId } from '../../contexts/UserContext';

const Login = () => {
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [signInData, setSignInData] = useState({ userId: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const { setUserId } = useUserId();




    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await apiClient.post('/auth/log-in', {
                userId: signInData.userId,
                password: signInData.password,
            });

            if (response.data.code === 1000 && response.data.result?.token) {
                const token = response.data.result.token;

                sessionStorage.setItem('authToken', token);
                console.log('Token saved to sessionStorage');


                const decodedToken: { scope: string } = jwtDecode(token); // Giải mã token
                console.log('Decoded Token:', decodedToken);

                setAuth({
                    userId: signInData.userId,  // Lấy thông tin userId từ token
                    roles: decodedToken?.scope ?? "",     // Lấy thông tin roles từ token
                });

                setUserId(signInData.userId)

                if (auth) {

                    console.log(auth)
                    switch (auth.roles) {
                        case "ADMIN":
                        case "LIBRARIAN":
                            navigate("/admin"); break;
                        case "MEMBER":
                            navigate('/home'); break;
                    }
                }
            } else {
                setError(isAdminMode ? 'Tên đăng nhập hoặc mật khẩu không đúng' : 'Mã sinh viên hoặc mật khẩu không đúng');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(isAdminMode ? 'Tên đăng nhập hoặc mật khẩu không đúng' : 'Mã sinh viên hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className='login-page'>
            <div className={`container ${isAdminMode ? 'active' : ''}`} id="container">
                {/* Admin Login Form */}
                <div className="form-container sign-up">
                    <form onSubmit={handleSignIn}>
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
                        <button type="submit">Đăng nhập</button>
                    </form>
                </div>

                {/* User Login Form */}
                <div className="form-container sign-in">
                    <form onSubmit={handleSignIn}>
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

                {/* Toggle between Admin and User Login */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Xin chào!</h1>
                            <p>Đăng nhập với tư cách người dùng để sử dụng các tính năng của thư viện</p>
                            <button onClick={() => setIsAdminMode(false)}>Đăng nhập người dùng</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Xin chào quản trị viên!</h1>
                            <p>Đăng nhập với tư cách quản trị viên để quản lý hệ thống</p>
                            <button onClick={() => setIsAdminMode(true)}>Đăng nhập quản trị</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
