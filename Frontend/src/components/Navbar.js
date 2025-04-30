import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav style={{ backgroundColor: '#007bff', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 'bold' }}>RBAC Blog</div>
      <div>
        <button onClick={() => navigate('/blogs')} style={{ marginRight: '10px', background: 'white', color: '#007bff', padding: '5px 10px', borderRadius: '5px' }}>Blogs</button>
        {role === 'admin' && (
          <button onClick={() => navigate('/admin')} style={{ marginRight: '10px', background: 'white', color: '#007bff', padding: '5px 10px', borderRadius: '5px' }}>Admin Dashboard</button>
        )}
        {token && (
          <button onClick={handleLogout} style={{ background: '#dc3545', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
