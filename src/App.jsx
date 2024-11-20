import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import Users from "./pages/Admin/Users";
import CreateProduct from "./pages/Admin/CreateProduct";
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Profile from "./pages/Profile";
import HomeDash from "./pages/Admin/HomeDash";
import ErrorPage from "./pages/ErrorPage";
import Searcher from "./components/Searcher";
import UserDashboard from "./components/UserRoute";
import ProductDetail from "./pages/ProductDetail";
import CreateCategory from "./pages/Admin/Createcategory";
import AdminRoute from "./pages/AdminRoute";
import Category from "./pages/Category";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import Charts from "./pages/Admin/Charts";
import Register from "./pages/Register";
import OrdersPage from "./pages/OrdersPage";
import AdminOrders from "./pages/Adminorders";
import OrderDetailPage from "./pages/OrderDetailPage";
import UserRoute from "./components/UserRoute";
import UploadBannerImages from "./pages/Admin/UploadBannerImages";
import Car from "./pages/Admin/Car";
import ForgotPass from "./pages/ForgotPass";
import HomeProduct from "./pages/HomeProduct";
import SplashScreen from "./components/Splashscreen";
import { useEffect, useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Show splash screen for 2 seconds
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <BrowserRouter>
    <Routes>
      {/* Common Routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/categories" element={<Category />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/searcher" element={<Searcher />} />
      <Route path="/product" element={<HomeProduct />} />
      
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetailPage />} />
      <Route path="forgot" element={<ForgotPass />} />


      {/* User Dashboard */}
      <Route path="/userdash/*" element={<UserRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      {/* Admin Dashboard - Protected */}
      <Route path="/admin/*" element={<AdminRoute />}>
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="product/:slug" element={<UpdateProduct />} />
        <Route path="product" element={<Product />} />
        <Route path="homedash" element={<HomeDash />} />
        <Route path="charts" element={<Charts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="Banner" element={<UploadBannerImages />} />
        <Route path="car" element={<Car />} />



      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>

  );
};

export default App;
