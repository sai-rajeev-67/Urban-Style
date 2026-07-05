import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const Invoice = () => {

  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {

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
      <h2 className="text-center mt-5">
        No Invoice Found
      </h2>
    );

  }

  return (
    <div className="container mt-5">

      <h1>
        UrbanStyle Invoice
      </h1>

      <hr />

      <h5>
        Invoice ID:
        {" "}
        {order.id}
      </h5>

      <p>
        Customer:
        {" "}
        {order.customer.name}
      </p>

      <p>
        Phone:
        {" "}
        {order.customer.phone}
      </p>

      <p>
        Address:
        {" "}
        {order.customer.address}
      </p>

      <p>
        Date:
        {" "}
        {order.date}
      </p>

      <hr />

      {order.items.map(
        (item) => (
          <p
            key={`${item.id}-${item.selectedSize}`}
          >
            {item.name}
            {" x "}
            {item.quantity}
          </p>
        )
      )}

      <hr />

      <h3>
        Total:
        {" "}
        ₹{order.total}
      </h3>

      <button
        className="btn btn-dark"
        onClick={() =>
          window.print()
        }
      >
        Print Invoice
      </button>

    </div>
  );
};

export default Invoice;