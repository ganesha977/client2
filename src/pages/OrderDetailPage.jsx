import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layouts/Layout';
import { useAuth } from '../store/Auth';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './OrderDetailPage.css';

const OrderStatusBar = ({ status }) => {
  const statuses = ['Processing', 'Shipped', 'Out for delivery', 'Delivered'];
  const currentIndex = statuses.indexOf(status);

  return (
    <div className="order-status-bar">
      {statuses.map((step, index) => (
        <div key={step} className="status-step">
          <div className={`status-icon ${index <= currentIndex ? 'active' : ''}`}>
            {index === 0 && <span>📦</span>}
            {index === 1 && <span>🚚</span>}
            {index === 2 && <span>🏠</span>}
            {index === 3 && <span>✅</span>}
          </div>
          <p className="status-label">{step}</p>
          {index < statuses.length - 1 && (
            <div className={`status-line ${index < currentIndex ? 'active' : ''}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { AuthorizationToken } = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://server-1-a1zo.onrender.com/api/v1/auth/orders/${id}`, {
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
        setOrder(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [AuthorizationToken, id]);

  return (
    <Layout>
      <div className="order-detail-container">
        <h1 className="page-title">Order Details</h1>
        {loading && (
          <div className="loading-skeleton">
            <Skeleton height={40} />
            <Skeleton height={200} />
            <Skeleton height={50} count={3} />
          </div>
        )}
        {error && (
          <div className="error-message">
            <p className="error-title">Error</p>
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && !order && (
          <div className="not-found-message">
            <p className="not-found-title">Order not found</p>
            <p>The requested order could not be found.</p>
          </div>
        )}
        {order && (
          <div className="order-detail">
            <h2 className="order-id">Order ID: {order._id}</h2>
            <OrderStatusBar status={order.status} />
            <div className="order-info-grid">
              <div className="order-info-item">
                <p className="info-label">Buyer</p>
                <p className="info-value">{order.buyer.name}</p>
              </div>
              <div className="order-info-item">
                <p className="info-label">Created At</p>
                <p className="info-value">{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
              <div className="order-info-item">
                <p className="info-label">Payment Status</p>
                <p className={`info-value ${order.payment ? 'payment-success' : 'payment-failed'}`}>
                  {order.payment ? 'Success' : 'Failed'}
                </p>
              </div>
              <div className="order-info-item">
                <p className="info-label">Total Quantity</p>
                <p className="info-value">{order.products.length}</p>
              </div>
            </div>
            <h3 className="products-title">Products</h3>
            <div className="products-list">
              {order.products.map(({ product }) => (
                <div key={product._id} className="product-item">
                  <div className="product-image">
                    {product.images && product.images.length > 0 && (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="product-img"
                      />
                    )}
                  </div>
                  <div className="product-details">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">₹{product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetailPage;