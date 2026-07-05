import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";
import "./orders.css";

const Orders = () => {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const response =
        await API.get("/orders");

      setOrders(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          My Orders 📦
        </h2>

        {orders.length === 0 ? (

          <div className="text-center mt-5">

            <h4>
              No Orders Found
            </h4>

            <Link
              to="/products"
              className="btn btn-dark mt-3"
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="card order-card p-4 mb-4 shadow"
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h5>
                    Order #{order.id}
                  </h5>

                  <p className="mb-0 text-muted">
                    {order.date}
                  </p>

                </div>

                <span className="order-status">
                  Delivered
                </span>

              </div>

              <hr />

              <p>
                <strong>
                  Customer:
                </strong>
                {" "}
                {order.customer.name}
              </p>

              <p className="order-total">
                ₹{order.total}
              </p>

              <h6 className="mt-3">
                Ordered Products
              </h6>

              {order.items.map(
                (item) => (

                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="order-product"
                  >

                    <strong>
                      {item.name}
                    </strong>

                    <br />

                    Size:
                    {" "}
                    {item.selectedSize}

                    {" | Qty: "}
                    {item.quantity}

                  </div>

                )
              )}

              <div className="mt-3 d-flex gap-2">

                <Link
                  to={`/orders/${order.id}`}
                  className="btn btn-outline-dark"
                >
                  View Details
                </Link>

                <Link
                  to={`/invoice/${order.id}`}
                  className="btn btn-dark"
                >
                  Invoice
                </Link>

              </div>

            </div>

          ))

        )}

      </div>

      <Footer />
    </>
  );
};

export default Orders;