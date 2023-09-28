import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PrivateRoute from "./components/private-route/PrivateRoute";
import { auth } from "./firebase-config";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Category from "./pages/category/Category";
import Customers from "./pages/customers/Customers";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/order/Orders";
import PaymentOptions from "./pages/payment-options/PaymentOptions";
import AddNewProduct from "./pages/product/AddNewProduct";
import EditProduct from "./pages/product/EditProduct";
import Product from "./pages/product/Product";
import Profile from "./pages/profile/Profile";
import Reviews from "./pages/review/Reviews";
import { getUserInfo } from "./redux/auth/userAction";

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
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        {/* </PrivateRoute> */}
        {/* Private Routes */}
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/new"
          element={
            <PrivateRoute>
              <AddNewProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/edit/:slug"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-options"
          element={
            <PrivateRoute>
              <PaymentOptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
