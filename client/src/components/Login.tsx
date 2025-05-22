import { useState } from 'react';
import axios from '../api/axios';
import './Login.css';

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [signInData, setSignInData] = useState({
    studentId: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    name: '',
    studentId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', {
        studentId: signInData.studentId,
        password: signInData.password
      });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch {
      setError('Invalid student ID or password');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', signUpData);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            placeholder="Name"
            value={signUpData.name}
            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="StudentId"
            value={signUpData.studentId}
            onChange={(e) => setSignUpData({ ...signUpData, studentId: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your student-id password</span>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            placeholder="Student id"
            value={signInData.studentId}
            onChange={(e) => setSignInData({ ...signInData, studentId: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signInData.password}
            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
            required
          />
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" onClick={() => setIsActive(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" onClick={() => setIsActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 