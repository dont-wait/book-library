import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios from "./api/axios";
import Login from "./components/Login";

interface Book {
  BookName: string,
  Title: string;
  Author: string;
  ImageBook: string;
  CategoryId: string;
  ISBN: string;
  PublishedDate: string;
}

const App = () => {
  const [books, setBook] = useState<Book[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const getBooks = async () => {
        const bookList = await axios.get("/books")
        setBook(bookList.data)
      }
      getBooks();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div>
                {books.map(book => (
                  <div key={book.ISBN}>
                    <h1>{book.Title}</h1>
                    <h2>{book.Author}</h2>
                    <img src={book.ImageBook} alt={book.Title} />
                    <p>{book.PublishedDate}</p>
                    <p>{book.CategoryId}</p>
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
  )
}

export default App