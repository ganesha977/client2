import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from '../../components/Layouts/AdminMenu';
import { FaBell, FaShoppingCart } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <AdminMenu open={open} drawerWidth={240} />

      {/* Main Content */}
      <div style={{
        flexGrow: 1,
        marginLeft: isMobile ? 0 : (open ? 240 : 70),
        transition: 'margin 0.3s ease',
        overflow: 'auto',
        backgroundColor: '#f0f2f5', // Set background color here
      }}>
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          padding: '1rem',
          backgroundColor: '#fff',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>Admin Dashboard</h1>
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'none',
              border: 'none',
              color: '#555',
              cursor: 'pointer',
              fontSize: '1.5rem',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaBell size={24} style={{ marginRight: '1rem', color: '#555' }} />
            <FaShoppingCart size={24} style={{ color: '#555' }} />
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          padding: '1rem',
          minHeight: 'calc(100vh - 64px)', // Adjust height here
        }}>
          <Outlet /> {/* Nested routes will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
