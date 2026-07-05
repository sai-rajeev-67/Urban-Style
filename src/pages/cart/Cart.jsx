import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const clearCart = () => {
    localStorage.removeItem("cart");
    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center">
            <h4>Cart is Empty</h4>

            <Link
              to="/products"
              className="btn btn-dark mt-3"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="card p-3 mb-3 shadow-sm"
              >
                <h5>{item.name}</h5>

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
                  {item.price * item.quantity}
                </p>

                <div className="d-flex align-items-center gap-3 mb-3">

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      decreaseQuantity(
                        item.id,
                        item.selectedSize
                      )
                    }
                  >
                    -
                  </button>

                  <h5 className="m-0">
                    {item.quantity}
                  </h5>

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      increaseQuantity(
                        item.id,
                        item.selectedSize
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="btn btn-outline-danger"
                  onClick={() =>
                    removeFromCart(
                      item.id,
                      item.selectedSize
                    )
                  }
                >
                  Remove
                </button>

              </div>
            ))}

            <div className="card p-4 mt-4 shadow">

              <h4>Order Summary</h4>

              <hr />

              <p>
                Total Items: {cart.length}
              </p>

              <h3>
                Total Amount: ₹{total}
              </h3>

              <div className="d-flex gap-3 mt-3">

                <button
                  className="btn btn-warning"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>

                <Link
                  to="/checkout"
                  className="btn btn-dark"
                >
                  Proceed To Checkout
                </Link>

              </div>

            </div>
          </>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Cart;