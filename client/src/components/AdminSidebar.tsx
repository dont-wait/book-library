import React from 'react';
import './AdminSidebar.css'; // Tạo file CSS riêng cho sidebar
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
    activeMenu: string;
    onMenuClick: (menuId: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeMenu, onMenuClick }) => {
    const navigate = useNavigate()
    return (
        <div className="admin-sidebar">
            <a
                href="#"
                className={`admin-sidebar-item ${activeMenu === 'manage-books' ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    onMenuClick('manage-books');
                }}
            >
                <i className="bi bi-journal-bookmark-fill"></i> Quản lý sách
            </a>
            <a
                href="#"
                className={`admin-sidebar-item ${activeMenu === 'publishers' ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    onMenuClick('publishers');
                }}
            >
                <i className="bi bi-journal-bookmark"></i> Danh sách nhà xuất bản
            </a>
            <a
                href="#"
                className={`admin-sidebar-item ${activeMenu === 'authors' ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    onMenuClick('authors');
                }}
            >
                <i className="bi bi-people"></i> Danh sách tác giả
            </a>
            <a
                href="#"
                className={`admin-sidebar-item ${activeMenu === 'category' ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    onMenuClick('category');
                }}
            >
                <i className="bi bi-tags"></i> Danh sách thể loại
            </a>
            <a
                href="#"
                className={`admin-sidebar-item ${activeMenu === 'manage-borrow' ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    onMenuClick('manage-borrow');
                }}
            >
                <i className="bi bi-card-checklist"></i> Quản lý mượn trả sách
            </a>

            {/* <a
                href="#"
                className={`admin-sidebar-item ${activeMenu === 'manage-administration' ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    onMenuClick('manage-administration');
                }}
            >
                <i className="bi bi-person-badge"></i> Quản trị
            </a> */}
            {/* Đăng xuất Button */}
            <Button variant="danger" className="mt-4" onClick={() => navigate('/')}>
                Đăng xuất
            </Button>
        </div>
    );
};

export default AdminSidebar;