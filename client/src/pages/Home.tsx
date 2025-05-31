import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';
import './Home.css';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  available: boolean;
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.BOOKS.GET_ALL);
        setBooks(response.data);
        setLoading(false);
      } catch {
        setError('Không thể tải danh sách sách. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBorrow = async (bookId: string) => {
    try {
      await axios.post(API_ENDPOINTS.BOOKS.BORROW(bookId));
      // Cập nhật lại danh sách sách sau khi mượn thành công
      const response = await axios.get(API_ENDPOINTS.BOOKS.GET_ALL);
      setBooks(response.data);
    } catch {
      setError('Không thể mượn sách. Vui lòng thử lại sau.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải danh sách sách...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Thư viện sách</h1>
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm sách..." />
          <button>Tìm kiếm</button>
        </div>
      </header>

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-cover">
              <img src={book.coverImage} alt={book.title} />
              <div className={`book-status ${book.available ? 'available' : 'unavailable'}`}>
                {book.available ? 'Có sẵn' : 'Đã mượn'}
              </div>
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">Tác giả: {book.author}</p>
              <p className="description">{book.description}</p>
              <button 
                className={`borrow-btn ${book.available ? '' : 'disabled'}`}
                onClick={() => book.available && handleBorrow(book.id)}
                disabled={!book.available}
              >
                {book.available ? 'Mượn sách' : 'Đã được mượn'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 