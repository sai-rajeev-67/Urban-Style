import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Cart from "../pages/cart/Cart";

import ProductList from "../pages/products/ProductList";
import ProductDetails from "../pages/products/ProductDetails";
import SearchResults from "../pages/products/SearchResults";
import CategoryProducts from "../pages/products/CategoryProducts";

import Checkout from "../pages/checkout/Checkout";
import OrderSuccess from "../pages/checkout/OrderSuccess";

import Wishlist from "../pages/wishlist/Wishlist";

import Orders from "../pages/orders/Orders";
import OrderDetails from "../pages/orders/OrderDetails";
import Invoice from "../pages/orders/Invoices";

import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import ChangePassword from "../pages/profile/ChangePassword";

import RazorpayPayment from "../pages/payments/RazorpayPayment";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// Admin Pages
import Dashboard from "../admin/pages/Dashboard";
import ProductManagement from "../admin/pages/ProductManagement";
import UserManagement from "../admin/pages/UserManagement";
import OrderManagement from "../admin/pages/OrderManagement";
import CategoryManagement from "../admin/pages/CategoryManagement";
import AddProduct from "../admin/pages/AddProduct";
import EditProduct from "../admin/pages/EditProduct";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/products" element={<ProductList />} />

      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/search" element={<SearchResults />} />

      <Route
        path="/category/:category"
        element={<CategoryProducts />}
      />

      <Route
        path="/order-success"
        element={<OrderSuccess />}
      />

      <Route
        path="/razorpay"
        element={<RazorpayPayment />}
      />

      {/* ================= PROTECTED USER ROUTES ================= */}

      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
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
        path="/orders/:id"
        element={
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/invoice/:id"
        element={
          <PrivateRoute>
            <Invoice />
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

      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-product"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/edit-product/:id"
        element={
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <CategoryManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <OrderManagement />
          </AdminRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;