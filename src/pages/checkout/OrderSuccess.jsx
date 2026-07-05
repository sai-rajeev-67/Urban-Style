import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./ordersuccess.css";

const OrderSuccess = () => {
  return (
    <>
      <Navbar />

      <div className="container success-container">

        <div className="card success-card shadow">

          <div className="success-icon">
            ✅
          </div>

          <h1 className="mt-3">
            Order Placed Successfully
          </h1>

          <p className="text-muted">
            Thank you for shopping with
            UrbanStyle.
          </p>

          <p>
            Your order has been confirmed
            and payment received.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">

            <Link
              to="/orders"
              className="btn btn-dark success-btn"
            >
              View Orders
            </Link>

            <Link
              to="/products"
              className="btn btn-outline-dark success-btn"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default OrderSuccess;