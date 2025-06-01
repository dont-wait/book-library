import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios from "./api/axios";
import { API_ENDPOINTS } from "./api/endpoints";
import Login from "./components/Login";

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

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Kiểm tra token trong cookie thông qua một request
        await axios.get(API_ENDPOINTS.USERS.GET_PROFILE);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const getBooks = async () => {
        try {
          const response = await axios.get(API_ENDPOINTS.BOOKS.GET_ALL);
          setBooks(response.data.result || []);
        } catch (err) {
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

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
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
      </Routes>
    </Router>
  );
}

export default App;