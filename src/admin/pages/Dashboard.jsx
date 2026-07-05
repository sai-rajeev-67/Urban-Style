import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./dashboard.css";

const Dashboard = () => {

  const [users, setUsers] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const usersRes =
        await API.get("/users");

      const ordersRes =
        await API.get("/orders");

      const productsRes =
        await API.get("/products");

      setUsers(usersRes.data);

      setOrders(ordersRes.data);

      setProducts(productsRes.data);

    } catch (error) {

      console.log(error);

    }

  };

  const revenue =
    orders.reduce(
      (sum, order) =>
        sum +
        Number(order.total || 0),
      0
    );

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          Admin Dashboard
        </h2>

        <div className="row">

          <div className="col-md-3 mb-3">
            <div className="card stat-card users-card p-4 text-center shadow">
              <div className="stat-icon">👤</div>
              <h5>Total Users</h5>
              <h2>{users.length}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card stat-card orders-card p-4 text-center shadow">
              <div className="stat-icon">📦</div>
              <h5>Total Orders</h5>
              <h2>{orders.length}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card stat-card products-card p-4 text-center shadow">
              <div className="stat-icon">🛍️</div>
              <h5>Total Products</h5>
              <h2>{products.length}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card stat-card revenue-card p-4 text-center shadow">
              <div className="stat-icon">💰</div>
              <h5>Revenue</h5>
              <h2>₹{revenue}</h2>
            </div>
          </div>

        </div>

        <div className="mt-5">

          <h4 className="mb-3">
            Quick Actions
          </h4>

          <div className="d-flex gap-3 flex-wrap">

            <Link
              to="/admin/products"
              className="btn btn-dark"
            >
              🛍 Manage Products
            </Link>

            <Link
              to="/admin/orders"
              className="btn btn-dark"
            >
              📦 Manage Orders
            </Link>

            <Link
              to="/admin/users"
              className="btn btn-dark"
            >
              👤 Manage Users
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Dashboard;