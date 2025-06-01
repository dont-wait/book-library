import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Book Library</h1>
        <div className="user-actions">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header; 