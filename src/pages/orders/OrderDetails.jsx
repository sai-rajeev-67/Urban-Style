import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";
import { toast } from "react-toastify";

const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {

    try {

      const response =
        await API.get(
          `/orders/${id}`
        );

      setOrder(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  if (!order) {

    return (
      <>
        <Navbar />

        <div className="container mt-5">

          <h2>
            Order Not Found
          </h2>

        </div>

        <Footer />
      </>
    );

  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          Order Details
        </h2>

        <div className="card p-4 shadow">

          <h5>
            Order ID: {order.id}
          </h5>

          <p>
            <strong>
              Customer:
            </strong>{" "}
            {order.customer.name}
          </p>

          <p>
            <strong>
              Phone:
            </strong>{" "}
            {order.customer.phone}
          </p>

          <p>
            <strong>
              Address:
            </strong>{" "}
            {order.customer.address}
          </p>

          <p>
            <strong>
              Date:
            </strong>{" "}
            {order.date}
          </p>

          <h4 className="text-success">
            Total: ₹{order.total}
          </h4>

          <hr />

          <h5>
            Ordered Products
          </h5>

          {order.items.map(
            (item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="card p-3 mb-3"
              >

                <h6>
                  {item.name}
                </h6>

                <p>
                  Price: ₹{item.price}
                </p>

                <p>
                  Size: {item.selectedSize}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>

                <p>
                  Subtotal: ₹
                  {item.price *
                    item.quantity}
                </p>

              </div>
            )
          )}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default OrderDetails;