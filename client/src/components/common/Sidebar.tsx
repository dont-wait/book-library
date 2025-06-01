import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/books', label: 'Books' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/categories', label: 'Categories' },
    { path: '/admin/authors', label: 'Authors' },
    { path: '/admin/borrows', label: 'Borrows' },
    { path: '/admin/returns', label: 'Returns' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 