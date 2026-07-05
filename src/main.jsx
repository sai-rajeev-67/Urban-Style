import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import { ToastContainer } from "react-toastify";

import "./styles/global.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>

    <AuthProvider>

      <WishlistProvider>

        <CartProvider>

          <App />
          <ToastContainer
           position="top-right"
           autoClose={2000}
          />

        </CartProvider>

      </WishlistProvider>

    </AuthProvider>

  </BrowserRouter>
);