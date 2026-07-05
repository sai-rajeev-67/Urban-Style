import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import API from "../../services/api";

const OrderManagement = () => {

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
          Order Management
        </h2>

        {orders.length === 0 ? (

          <h4>
            No Orders Found
          </h4>

        ) : (

          orders.map(
            (order) => (

              <div
                key={order.id}
                className="card p-4 mb-3 shadow"
              >

                <h5>
                  Order #{order.id}
                </h5>

                <p>
                  Customer:
                  {" "}
                  {order.customer?.name}
                </p>

                <p>
                  Total:
                  {" "}
                  ₹{order.total}
                </p>

                <div className="d-flex gap-2">

                  <Link
                    to={`/orders/${order.id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/invoice/${order.id}`}
                    className="btn btn-success"
                  >
                    Invoice
                  </Link>

                </div>

              </div>

            )
          )

        )}

      </div>

      <Footer />
    </>
  );
};

export default OrderManagement;