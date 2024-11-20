import React, { useState, useEffect } from "react";
import { Select } from "antd";
import moment from "moment";
import { useAuth } from "../store/Auth";
import "./adminorders.css";

const { Option } = Select;

const AdminOrders = () => {
  const [statusOptions, setStatusOptions] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const { AuthorizationToken } = useAuth();

  const getOrders = async () => {
    try {
      const response = await fetch("https://server-1-a1zo.onrender.com/api/v1/auth/all-orders", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.data); // Adjust according to the actual response structure
      } else {
        console.error("Error fetching orders", await response.text());
      }
    } catch (error) {
      console.error("Error during fetch orders:", error);
    }
  };

  useEffect(() => {
    if (AuthorizationToken) getOrders();
  }, [AuthorizationToken]);

  const handleChange = async (orderId, value) => {
    try {
      const response = await fetch(`https://server-1-a1zo.onrender.com/api/v1/auth/status/${orderId}`, {
        method: "PUT",
        headers: {
          Authorization: AuthorizationToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: value }),
      });

      if (response.ok) {
        await response.json();
        getOrders();
      } else {
        console.error("Error updating order status", await response.text());
      }
    } catch (error) {
      console.error("Error during update order status:", error);
    }
  };

  return (
    <div className="admin-orders">
      <h1 className="admin-orders__title">Order Management</h1>
      <div className="admin-orders__content">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div className="order-card" key={order._id}>
              <div className="order-card__header">
                <h2 className="order-card__title">Order #{index + 1}</h2>
                <Select
                  className="order-card__status-select"
                  onChange={(value) => handleChange(order._id, value)}
                  defaultValue={order.status}
                >
                  {statusOptions.map((s, index) => (
                    <Option key={index} value={s}>
                      {s}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="order-card__details">
                <div className="order-card__detail">
                  <span className="order-card__detail-label">Buyer:</span>
                  <span className="order-card__detail-value">{order.buyer?.name}</span>
                </div>
                <div className="order-card__detail">
                  <span className="order-card__detail-label">Date:</span>
                  <span className="order-card__detail-value">{moment(order.createdAt).format('MMMM D, YYYY')}</span>
                </div>
                <div className="order-card__detail">
                  <span className="order-card__detail-label">Payment:</span>
                  <span className="order-card__detail-value">
                    {order.payment?.success ? "Success" : "Failed"}
                  </span>
                </div>
                <div className="order-card__detail">
                  <span className="order-card__detail-label">Quantity:</span>
                  <span className="order-card__detail-value">{order.products?.length}</span>
                </div>
              </div>
              <div className="order-card__products">
                {order.products?.length > 0 ? (
                  order.products.map((item) =>
                    item?.product ? ( // Ensure item.product exists
                      <div className="product-card" key={item.product._id}>
                        {item.product.images && item.product.images.length > 0 ? (
                          <img
                            src={item.product.images[0]?.url || 'path/to/fallback-image.jpg'}
                            className="product-card__image"
                            alt={item.product.name}
                            onError={(e) => e.target.src = 'path/to/fallback-image.jpg'} // Fallback image path
                          />
                        ) : (
                          <span className="no-image">No Image</span>
                        )}
                        <div className="product-card__info">
                          <h3 className="product-card__name">{item.product.name || 'Unnamed Product'}</h3>
                          <p className="product-card__description">
                            {item.product.description?.substring(0, 50) || 'No description available'}...
                          </p>
                          <p className="product-card__price text-decoration-line-through">
                            ₹{item.product.price}
                          </p>
                          {item.product.discountedPrice && (
                            <p className="product-card__discounted-price">
                              ₹{item.product.discountedPrice}
                            </p>
                          )}
                          <span className={item.product.quantity > 0 ? 'inStock' : 'outOfStock'}>
                            {item.product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    ) : null // Skip rendering if product is null
                  )
                ) : (
                  <p>No products found</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="admin-orders__no-orders">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
