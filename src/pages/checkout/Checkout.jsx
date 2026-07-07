import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./checkout.css";
import { toast } from "react-toastify";

const Checkout = () => {

  const { cart } =
    useContext(CartContext);

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    });

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
      item.quantity,
    0
  );

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const placeOrder = () => {

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address
    ) {

      toast.warning(
        "Fill all required fields"
      );

      return;

    }

    const currentUser = JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

    if (!currentUser) {

      toast.error(
        "Please login first"
      );

      navigate("/login");

      return;

    }

    const pendingOrder = {

      id: Date.now(),

      userId:
        currentUser.id,

      userEmail:
        currentUser.email,

      date:
        new Date().toLocaleDateString(),

      customer:
        formData,

      items:
        cart,

      total:
        total,

    };

    sessionStorage.setItem(
      "pendingOrder",
      JSON.stringify(
        pendingOrder
      )
    );

    navigate("/razorpay");

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="checkout-step">
          🛒 Cart → 📍 Checkout → 💳 Payment
        </div>

        <h2 className="checkout-title mb-4">
          Checkout
        </h2>

        <div className="row">

          <div className="col-md-7">

            <div className="card checkout-card shadow p-4">

              <h4 className="mb-4">
                Shipping Information
              </h4>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="form-control checkout-input mb-3"
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="form-control checkout-input mb-3"
                onChange={handleChange}
              />

              <textarea
                name="address"
                placeholder="Address"
                className="form-control checkout-input mb-3"
                rows="4"
                onChange={handleChange}
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                className="form-control checkout-input mb-3"
                onChange={handleChange}
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="form-control checkout-input"
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="col-md-5">

            <div className="card checkout-summary shadow p-4">

              <h4>
                Order Summary
              </h4>

              <hr />

              <p>
                Total Products:{" "}
                {cart.length}
              </p>

              <p>
                Delivery: Free
              </p>

              <hr />

              <h3 className="text-success">
                ₹{total}
              </h3>

              <button
                className="btn btn-dark checkout-btn w-100 mt-3"
                onClick={placeOrder}
              >
                Proceed To Payment
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Checkout;