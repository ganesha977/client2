import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';
import Layout from '../components/Layouts/Layout';
import { Spinner } from 'react-bootstrap';

export const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://server-1-a1zo.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success('Login successful');
        setUser({ email: '', password: '' });
        storeTokenInLS(responseData.token);
        navigate('/');
      } else {
        const responseData = await response.json();
        toast.error(responseData.extraDetails || responseData.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            width: '100%',
            maxWidth: '480px',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="email" style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="password" style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe" style={{ marginLeft: '8px' }}>
                  Remember me
                </label>
              </div>
              <button
                type="button"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#4c51bf',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/forgot')}
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#4c51bf',
                color: 'white',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'medium',
                width: '100%',
                cursor: 'pointer',
              }}
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" style={{ marginRight: '8px' }} />
              ) : null}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p style={{ marginBottom: '0' }}>
              Don't have an account? <a href="/register">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};