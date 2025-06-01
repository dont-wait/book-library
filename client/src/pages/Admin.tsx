import { useState } from 'react';
import UserManagement from '../components/admin/UserManagement';
import BookManagement from '../components/admin/BookManagement';
import AuthorManagement from '../components/admin/AuthorManagement';
import CategoryManagement from '../components/admin/CategoryManagement';
import PublisherManagement from '../components/admin/PublisherManagement';
import './Admin.css';

interface Tab {
  id: string;
  label: string;
  component: React.ReactNode;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs: Tab[] = [
    {
      id: 'users',
      label: 'Quản lý người dùng',
      component: <UserManagement />
    },
    {
      id: 'books',
      label: 'Quản lý sách',
      component: <BookManagement />
    },
    {
      id: 'authors',
      label: 'Quản lý tác giả',
      component: <AuthorManagement />
    },
    {
      id: 'categories',
      label: 'Quản lý thể loại',
      component: <CategoryManagement />
    },
    {
      id: 'publishers',
      label: 'Quản lý nhà xuất bản',
      component: <PublisherManagement />
    }
  ];

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Quản trị hệ thống</h1>
        <div className="admin-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="admin-content">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </main>
    </div>
  );
};

export default Admin; 