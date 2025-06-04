import { useState, useEffect } from 'react';
import './Admin.css';
import { Publisher, Category, Author, Book, BorrowBook, ReturnBook } from '../../type';
import { apiClient } from '../../api/axios';

const menuItems = [
  { id: 'publishers', label: 'Danh sách nhà xuất bản', icon: 'fas fa-building' },
  { id: 'authors', label: 'Danh sách tác giả', icon: 'fas fa-user-edit' },
  { id: 'categories', label: 'Danh sách thể loại', icon: 'fas fa-tags' },
  { id: 'books', label: 'Quản lý sách', icon: 'fas fa-book' },
  { id: 'loans', label: 'Quản lý mượn trả sách', icon: 'fas fa-exchange-alt' },
  { id: 'fines', label: 'Quản lý phạt', icon: 'fas fa-dollar-sign' },
  { id: 'admin', label: 'Quản trị', icon: 'fas fa-users-cog' },
  { id: 'settings', label: 'Cài đặt', icon: 'fas fa-cog' }
];

interface publisherApiResponse {
  data: { result: Publisher[] };
}

interface categoryApiResponse {
  data: { result: Category[] };
}

interface authorApiResponse {
  data: { result: Author[] };
}

interface bookApiResponse {
  data: { result: Book[] };
}

interface borrowBookApiResponse {
  data: { result: BorrowBook[] };
}

interface returnBookApiResponse {
  data: { result: ReturnBook[] };
}

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState('publishers');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowBook[]>([]);
  const [returnedBooks, setReturnedBooks] = useState<ReturnBook[]>([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      const response: publisherApiResponse = await apiClient.get('/publishers');
      setPublishers(response.data.result);
    };

    const fetchCategories = async () => {
      const response: categoryApiResponse = await apiClient.get('/categories');
      setCategories(response.data.result);
    };

    const fetchAuthors = async () => {
      const response: authorApiResponse = await apiClient.get('/authors');
      setAuthors(response.data.result);
    };

    const fetchBooks = async () => {
      const response: bookApiResponse = await apiClient.get('/books',
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
          }
        }
      );
      setBooks(response.data.result);
    };

    const fetchBorrowedBooks = async () => {
      const response: borrowBookApiResponse = await apiClient.get('/borrow-receipts',
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
          }
        }
      );
      setBorrowedBooks(response.data.result);
    };

    const fetchReturnedBooks = async () => {
      const response: returnBookApiResponse = await apiClient.get('/return-receipts',
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
          }
        }
      );
      setReturnedBooks(response.data.result);
    };

    fetchPublishers();
    fetchCategories();
    fetchAuthors();
    fetchBooks();
    fetchBorrowedBooks();
    fetchReturnedBooks();
  }, []);

  const handleMenuClick = (menuId: any) => {
    setActiveMenu(menuId);
    if (window.innerWidth <= 768) {
      setMobileMenuOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getContentTitle = () => {
    const item = menuItems.find(item => item.id === activeMenu);
    return item ? item.label : 'Dashboard';
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'publishers':
        return (
          <div>
            <div className="content-header">
              <h2 className="mb-0">Nhà xuất bản</h2>
              <button className="btn btn-primary">
                <i className="fas fa-plus me-2"></i>Thêm
              </button>
            </div>
            <div className="table-container">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {publishers.map(publisher => (
                    <tr key={publisher.publisherId}>
                      <td>{publisher.publisherId}</td>
                      <td>{publisher.publisherName}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-warning">Sửa</button>
                        <button className="btn btn-sm btn-outline-danger">Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'authors':
        return (
          <div>
            <h2>Danh sách tác giả</h2>
            <button className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>Thêm Tác Giả
            </button>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên Tác Giả</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {authors.map(author => (
                  <tr key={author.authorId}>
                    <td>{author.authorId}</td>
                    <td>{author.authorName}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-warning">Sửa</button>
                      <button className="btn btn-sm btn-outline-danger">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'categories':
        return (
          <div>
            <h2>Danh sách thể loại</h2>
            <button className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>Thêm Thể Loại
            </button>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên Thể Loại</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.categoryId}>
                    <td>{category.categoryId}</td>
                    <td>{category.categoryName}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-warning">Sửa</button>
                      <button className="btn btn-sm btn-outline-danger">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'books':
        return (
          <div>
            <h2>Danh sách sách</h2>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên sách</th>
                  <th>Giá</th>
                  <th>Tác giả</th>
                  <th>Nhà xuất bản</th>
                  <th>Thể loại</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.bookId}>
                    <td>{book.bookId}</td>
                    <td>{book.bookName}</td>
                    <td>{book.cost}</td>
                    <td>{book.authorName}</td>
                    <td>{book.publisherName}</td>
                    <td>{book.categoryName}</td>
                    <td>{book.rating}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">Xem</button>
                      <button className="btn btn-sm btn-outline-warning">Sửa</button>
                      <button className="btn btn-sm btn-outline-danger">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'loans':
        return (
          <div>
            <h2>Quản lý mượn trả sách</h2>
            <h3>Đang mượn</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên sách</th>
                  <th>Người mượn</th>
                  <th>Thời gian mượn</th>
                  <th>Thời gian hết hạn</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map(borrow => (
                  <tr key={borrow.borrowReceiptId}>
                    <td>{borrow.borrowReceiptId}</td>
                    <td>{borrow.bookName}</td>
                    <td>{borrow.userId}</td>
                    <td>{borrow.borrowDate}</td>
                    <td>{borrow.dueDate}</td>
                    <td>{borrow.statusReceiptName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Đã trả</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên sách</th>
                  <th>Ngày trả</th>
                  <th>Trạng thái sách</th>
                </tr>
              </thead>
              <tbody>
                {returnedBooks.map(returned => (
                  <tr key={returned.returnReceiptId}>
                    <td>{returned.returnReceiptId}</td>
                    <td>{returned.borrowReceiptId}</td>
                    <td>{returned.returnDate}</td>
                    <td>{returned.statusBookName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <div className="content-header">
            <h2>{getContentTitle()}</h2>
            <p className="text-muted">Nội dung cho {getContentTitle()} sẽ được hiển thị ở đây.</p>
          </div>
        );
    }
  };

  return (
    <div>
      <button className="mobile-toggle" onClick={toggleMobileMenu}>
        <i className="fas fa-bars"></i>
      </button>

      <div className={`overlay ${mobileMenuOpen ? 'show' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>

      <nav className={`sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${mobileMenuOpen ? 'show' : ''}`}>
        <div className="sidebar-brand">
          <i className="fas fa-book-open me-2" style={{ color: '#10b981' }}></i>
          {!sidebarCollapsed && <span>Lib Mng</span>}
          <button className="toggle-btn ms-auto d-none d-md-block" onClick={toggleSidebar}>
            <i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>
        </div>

        <ul className="sidebar-nav">
          {menuItems.map(item => (
            <li key={item.id} className="nav-item">
              <a
                href="#"
                className={`nav-link ${activeMenu === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(item.id);
                }}
              >
                <i className={`nav-icon ${item.icon}`}></i>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className={`main-content ${sidebarCollapsed ? 'main-content-expanded' : ''}`}>
        <div className="container-fluid p-4">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Admin;
