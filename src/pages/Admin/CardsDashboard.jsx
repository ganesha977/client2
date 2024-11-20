import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { MdShoppingBag } from 'react-icons/md';
import { GiStarsStack } from 'react-icons/gi';

const CardsDashboard = () => {
  const stats = {
    users: { count: 153, isIncrease: true },
    orders: { count: 3, isIncrease: false },
    products: { count: 35, isIncrease: true },
    reviews: { count: 9, isIncrease: true },
  };

  const Card = ({ title, count, icon, isIncrease }) => (
    <div style={styles.card} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ fontSize: '2.5rem', color: '#6366F1' }}>{icon}</div>
      <div>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardCount}>{count}</p>
        <p style={{ ...styles.cardChange, color: isIncrease ? '#4CAF50' : '#F44336' }}>
          {isIncrease ? '+5%' : '-2%'}
        </p>
      </div>
    </div>
  );

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.title}>User Overview</h1>
      <div style={styles.cardGrid}>
        <Card title="Total Users" count={stats.users.count} icon={<FaUserCircle />} isIncrease={stats.users.isIncrease} />
        <Card title="Total Orders" count={stats.orders.count} icon={<IoMdCart />} isIncrease={stats.orders.isIncrease} />
        <Card title="Total Products" count={stats.products.count} icon={<MdShoppingBag />} isIncrease={stats.products.isIncrease} />
        <Card title="Total Reviews" count={stats.reviews.count} icon={<GiStarsStack />} isIncrease={stats.reviews.isIncrease} />
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    backgroundColor: '#F3F4F6',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    color: '#111827',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    minHeight: '200px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
  },
  cardTitle: {
    margin: '0 0 10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#555',
  },
  cardCount: {
    margin: '0',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
  },
  cardChange: {
    marginTop: '5px',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
  },
};

export default CardsDashboard;
