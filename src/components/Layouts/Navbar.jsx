import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/Auth';
import { ShoppingCart, ChevronDown, ChevronUp, LogOut, Menu } from 'lucide-react';
import SearchInput from '../Form/SearchInput';
import { useCart } from '../../store/UseCart';
import logo from "../../assets/ecomlogo.jpg";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { isLoggedIn, user, LogoutUser } = useAuth();
  const { cart } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar sticky-top">
      <div className="navbar-container">
        <div className="navbar-top">
          <NavLink to="/" className="navbar-logo">
            <img src={logo} alt="Logo" />
          </NavLink>
          <div className="navbar-search">
            <SearchInput />
          </div>
          <div className="navbar-actions">
            <NavLink to="/cart" className="navbar-cart">
              <ShoppingCart size={24} />
              <span className="cart-badge">{cart?.length || 0}</span>
            </NavLink>
            <div className="navbar-user-menu" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <a className="navbar-user-toggle text-decoration-none">
                <CgProfile size={24} />
                <span className='text-decoration-none'>{user?.name || 'Login'}</span>
                {isHovered ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </a>
              <ul className={`navbar-dropdown ${isHovered ? 'show' : ''}`}>
                {isLoggedIn ? (
                  user?.isAdmin ? (
                    <>
                      <li><NavLink to="/admin/homedash">Admin Dashboard</NavLink></li>
                      <li><NavLink to="/admin/users">Users</NavLink></li>
                      <li><NavLink to="/admin/create-category">Create Category</NavLink></li>
                      <li><NavLink to="/admin/create-product">Create Product</NavLink></li>
                      <li><NavLink to="/orders">Orders</NavLink></li>
                      <li><NavLink to="/admin/orders">admin orders</NavLink></li>
                    </>
                  ) : (
                    <>
                      <li><NavLink to="/userdash/profile">My Profile</NavLink></li>
                      <li><NavLink to="/userdash/orders">Orders</NavLink></li>
                      <li><NavLink to="/cart">Cart</NavLink></li>
                    </>
                  )
                ) : (
                  <>
                    <li><NavLink to="/register">Register</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                  </>
                )}
                {isLoggedIn && (
                  <li><NavLink to="/" onClick={LogoutUser}>Logout</NavLink></li>
                )}
              </ul>
            </div>
          </div>
          <button className="navbar-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
