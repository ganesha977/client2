import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layouts/Layout';
import './OrdersPage.css';
import { useAuth } from '../store/Auth';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const OrderCard = ({ order, onClick }) => {
  // Use optional chaining to safely access nested properties
  if (!order?._id || !order?.products) {
    return null;
  }

  return (
    <div className="order-card" onClick={() => onClick(order._id)}>
      <div className="order-header">
        <span className={`order-status ${order.status?.toLowerCase()}`}>{order.status}</span>
        <span className="order-date">{moment(order.createdAt).format('MMM D, YYYY')}</span>
      </div>
      <div className="order-body">
        <div className="order-info">
          <p className="order-id">Order #{order._id.slice(-6)}</p>
          <p className="order-buyer">{order.buyer?.name || 'Unknown Buyer'}</p>
          <p className="order-payment">{order.payment ? 'Payment Successful' : 'Payment Failed'}</p>
        </div>
        <div className="order-products">
          {order.products.slice(0, 3).map(({ product }, index) => (
            <div key={product?._id || index} className="product-thumbnail">
              {product?.images?.length > 0 ? (
                <img src={product.images[0]?.url || ''} alt={product.name || 'Product'} />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
          ))}
          {order.products.length > 3 && (
            <div className="product-thumbnail more">
              +{order.products.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://server-1-a1zo.onrender.com/api/v1/auth/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: AuthorizationToken,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOrders(data?.data || []); // Use optional chaining here
      } catch (err) {
        setError(err?.message || 'An error occurred'); // Use optional chaining and default message
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [AuthorizationToken]);

  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <Layout>
      <div className="orders-page">
        <div className="orders-header">
          <h1>Your Orders</h1>
          <p className="orders-count">
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
        </div>
        {loading && (
          <div className="loading-skeleton">
            <Skeleton height={200} count={3} />
          </div>
        )}
        {error && <div className="error-message">Error: {error}</div>}
        {!loading && !error && orders.length === 0 && (
          <div className="no-orders">
            <i className="fas fa-box-open"></i>
            <p>You haven't placed any orders yet.</p>
            <button className="start-shopping-btn" onClick={() => navigate('/')}>
              Start Shopping
            </button>
          </div>
        )}
        {!loading && !error && orders.length > 0 && (
          <div className="orders-grid">
            {orders.map(order => (
              <OrderCard key={order._id} order={order} onClick={handleOrderClick} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
