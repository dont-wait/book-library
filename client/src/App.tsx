import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import axios from "./api/axios";
import { API_ENDPOINTS } from "./api/endpoints";
import Login from "./components/Login";
import Dashboard from "./pages/admin/Dashboard";

interface Book {
  bookId: number;
  bookName: string;
  description: string;
  bookImageURL: string;
  quantity: number;
  isbn: string;
  publicationDate: string;
  rating: number;
  floorPosition: string;
  publisherId: number;
  categoryId: number;
  authorId: number;
}

const AppContent = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const isAdminPath = window.location.pathname.startsWith('/admin');
        const endpoint = isAdminPath ? API_ENDPOINTS.ADMIN.GET_PROFILE : API_ENDPOINTS.ADMIN.GET_PROFILE;
        console.log('Using endpoint:', endpoint);
        
        const response = await axios.get(endpoint);
        console.log('Auth check response:', response.data);
        
        if (response.data.success) {
          setIsAuthenticated(true);
          // If on login page and authenticated, redirect to appropriate page
          if (window.location.pathname === '/login') {
            if (isAdminPath) {
              navigate('/admin');
            } else {
              navigate('/');
            }
          }
        } else {
          setIsAuthenticated(false);
          if (window.location.pathname !== '/login') {
            navigate('/login');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setIsAuthenticated(false);
        if (window.location.pathname !== '/login') {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      const getBooks = async () => {
        try {
          const response = await axios.get(API_ENDPOINTS.BOOKS.GET_ALL);
          setBooks(response.data.result || []);
        } catch (err) {
          console.error('Failed to fetch books:', err);
          setError('Failed to fetch books');
        }
      };
      getBooks();
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('Current path:', window.location.pathname);
  console.log('Is authenticated:', isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" replace /> : <Login />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <div>
              {books.map(book => (
                <div key={book.bookId}>
                  <h1>{book.bookName}</h1>
                  <p>{book.description}</p>
                  <img src={book.bookImageURL} alt={book.bookName} />
                  <p>Quantity: {book.quantity}</p>
                  <p>ISBN: {book.isbn}</p>
                  <p>Published: {book.publicationDate}</p>
                  <p>Rating: {book.rating}</p>
                  <p>Location: {book.floorPosition}</p>
                </div>
              ))}
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;