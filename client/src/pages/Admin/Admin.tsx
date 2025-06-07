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
  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
  };
  return (
    <div className="admin d-flex">
      <AdminSidebar activeMenu={activeMenu} onMenuClick={handleMenuClick} />

      <div id="admin-content" className="p-4">
        {activeMenu === 'manage-books' && <ManageBooks />}
        {activeMenu === 'publishers' && <Publishers />}
        {activeMenu === 'authors' && <Authors />}
        {activeMenu === 'category' && <Categories />}
        {activeMenu === 'manage-borrow' && <ManageBorrowReceipts />}
      </div>
    </div>
  );
};

export default Admin;
