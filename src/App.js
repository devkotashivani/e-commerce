
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgetPassword from "./pages/auth/ForgetPassword"
import Category from "./pages/category/Category"
import Customer from "./pages/customers/Customer"
import Dashboard from "./pages/dashboard/Dashboard"
import Orders from "./pages/orders/Orders"
import PaymentOption from "./pages/payment-option/PaymentOption"
import Product from "./pages/product/Product"
import Profile from "./pages/profile/Profile"
import Review from './pages/reviews/Review';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        {/* Private Routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/category' element={<Category />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/payment-option' element={<PaymentOption />} />
        <Route path='/product' element={<Product />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/review' element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
