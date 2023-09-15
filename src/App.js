
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
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserInfo } from './redux/auth/UserAction';
import { auth } from './firebaseConfig/config';
import PrivateRoute from './component/private-route/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user?.uid) {
      dispatch(getUserInfo(user?.uid));
    }
  });
  return (
    <div className="App">
     
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        {/* Private Routes */}
        <Route path='/register' element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path='/category' element={<PrivateRoute><Category /></PrivateRoute>} />
        <Route path='/customer' element={<PrivateRoute><Customer /></PrivateRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path='/payment-option' element={<PrivateRoute><PaymentOption /></PrivateRoute>} />
        <Route path='/product' element={<PrivateRoute><Product /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/review' element={<PrivateRoute><Review /></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
