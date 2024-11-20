import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import Layout from '../components/Layouts/Layout';

const Register = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: '', email: '', phone: '', password: '', address: '', answer: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://server-1-a1zo.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const responseData = await response.json();
        alert('Registration successful');
        storeTokenInLS(responseData.token);
        setUser({ name: '', email: '', phone: '', password: '', address: '', answer: '' });
        navigate('/login');
      } else {
        const responseData = await response.json();
        alert('Registration failed: ' + responseData.message || 'An error occurred');
      }
    } catch (error) {
      alert('An error occurred');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',marginTop:'100px', marginBottom:'100px', }}>
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
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Join Our Community</h2>
            <p style={{ marginBottom: '0' }}>Create your account and start shopping!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px', color: '#4c51bf' }}>
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  value={user.name}
                  onChange={handleInput}
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px', color: '#4c51bf' }}>
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  value={user.email}
                  onChange={handleInput}
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px', color: '#4c51bf' }}>
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  name="phone"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  value={user.phone}
                  onChange={handleInput}
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px', color: '#4c51bf' }}>
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px', color: '#4c51bf' }}>
                  <FaMapMarkerAlt />
                </span>
                <input
                  type="text"
                  name="address"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  value={user.address}
                  onChange={handleInput}
                  placeholder="Address"
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px', color: '#4c51bf' }}>
                  <FaShieldAlt />
                </span>
                <input
                  type="text"
                  name="answer"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  value={user.answer}
                  onChange={handleInput}
                  placeholder="Security Question Answer"
                  required
                />
              </div>
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
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Create Account'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p style={{ marginBottom: '0' }}>
              Already have an account? <a href="/login">Log in</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;