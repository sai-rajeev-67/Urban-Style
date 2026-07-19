import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {

  const { cart } =
    useContext(CartContext);

  const { wishlist } =
    useContext(WishlistContext);

  const {
    user,
    logout,
  } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          UrbanStyle
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="nav"
        >

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/products"
              >
                Products
              </Link>
            </li>

            {/* Normal User Menu */}
            {user && user.role !== "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/wishlist"
                  >
                    Wishlist

                    <span className="wishlist-badge">
                      {wishlist.length}
                    </span>

                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/cart"
                  >
                    Cart

                    <span className="cart-badge">
                      {cart.length}
                    </span>

                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/orders"
                  >
                    Orders
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-warning ms-3 logout-btn"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Admin Menu */}
            {user && user.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin/dashboard"
                  >
                    Admin Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-warning ms-3 logout-btn"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Guest Menu */}
{!user && (
  <>
    <li className="nav-item">
      <Link
        className="nav-link"
        to="/login"
      >
        Login
      </Link>
    </li>

    <li className="nav-item">
      <Link
        className="nav-link text-warning fw-bold"
        to="/admin-login"
      >
        Admin Login
      </Link>
    </li>

    <li className="nav-item">
      <Link
        className="nav-link"
        to="/register"
      >
        Register
      </Link>
    </li>
  </>
)}

          </ul>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;