import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Admin.css';
import AdminSidebar from '../../components/AdminSidebar';
import ManageBooks from '../../components/ManageBooks';
import Publishers from '../../components/Publishers';
import Authors from '../../components/Authors';
import Categories from '../../components/Categories';
import ManageBorrowReceipts from '../../components/ManageBorrowReceipts';
// import Administration from '../../components/Administration';
//import Settings from '../../components/Settings';


const Admin: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>('manage-books');
  const [notification, setNotification] = useState<{
    message: string;
    isError: boolean;
    show: boolean;
  }>({
    message: '',
    isError: false,
    show: false,
  });

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
  };

  const showNotification = (message: string, isError: boolean = false) => {
    setNotification({
      message,
      isError,
      show: true,
    });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <div className="admin d-flex">
      <AdminSidebar activeMenu={activeMenu} onMenuClick={handleMenuClick} />

      <div id="admin-content" className="p-4">
        {activeMenu === 'manage-books' && <ManageBooks />}
        {activeMenu === 'publishers' && <Publishers />}
        {activeMenu === 'authors' && <Authors />}
        {activeMenu === 'category' && <Categories />}
        {activeMenu === 'manage-borrow' && (
          <ManageBorrowReceipts showNotification={showNotification} />
        )}
        {/* {activeMenu === 'manage-punish' && <ManagePunish />} */}
        {activeMenu === 'manage-administration' && <Administration />}
        {/* {activeMenu === 'manage-setting' && <Settings />} */}
      </div>

      {notification.show && (
        <div
          className={`admin-notification ${notification.isError ? 'admin-notification-error' : 'admin-notification-success'}`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Admin;