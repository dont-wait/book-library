import React from 'react';
import './AdminSidebar.css'; // Tạo file CSS riêng cho sidebar
import { Button } from 'react-bootstrap';
import useAuth from "../hooks/useAuth";
import { apiClient } from "../api/axios";
import { useToast } from "../hooks/useToast.ts"
import { useNavigate } from 'react-router-dom';
interface AdminSidebarProps {
    activeMenu: string;
    onMenuClick: (menuId: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeMenu, onMenuClick }) => {
    const { showToast } = useToast();
    const { setAuth } = useAuth();
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            // Lấy token từ sessionStorage
            const token = sessionStorage.getItem("authToken");

            if (!token) {
                showToast("No token found. User is not authenticated.", "error");
                return;
            }

            // Gửi yêu cầu API đăng xuất
            const response: {
                data: {
                    code: number
                }
            } = await apiClient.post(
                "/auth/log-out",
                { token });

            if (response.data.code === 1000) {
                showToast(" Đăng xuất thành công", "success");

                setAuth({
                    userId: "",  // Xóa userId
                    roles: "",    // Xóa roles
                });

                sessionStorage.removeItem("authToken");

                navigate("/");
            } else {
                showToast("Đăng xuất thất bại. Vui lòng thử lại.", "error");
            }
        } catch (error) {
            showToast("Đã xảy ra lỗi khi đăng xuất.", "error");
        }
    };

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
            <Button variant="danger" className="mt-4" onClick={handleLogout}>
                Đăng xuất
            </Button>
        </div>
    );
};

export default AdminSidebar;