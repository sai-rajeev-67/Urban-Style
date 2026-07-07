import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import "../pages/products/Products.css";
import { toast } from "react-toastify";
const ProductCard = ({ product }) => {

  if (!product) return null;

  const { addToCart } =
    useContext(CartContext);

  const { addToWishlist } =
    useContext(WishlistContext);

  const { user } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] =
    useState("");

  const handleAddToCart = () => {

    if (!user) {

      alert(
        "Please Login First"
      );

      navigate("/login");

      return;
    }

    if (!selectedSize) {

     toast.warning(
  "Please select a size"
);

      return;
    }

    addToCart({
      ...product,
      selectedSize,
    });

    toast.success(
  "Added To Cart"
);
  };

  const handleWishlist = () => {

    if (!user) {

      toast.warning(
  "Please Login First"
);
      navigate("/login");

      return;
    }

    addToWishlist(product);

   toast.success(
  "Added To Wishlist ❤️"
);
  };

  return (
    <div className="card h-100 shadow product-card">

      <div className="position-relative">

        <span className="discount-badge">
          20% OFF
        </span>

        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
        />

      </div>

      <div className="card-body">

        <h5 className="fw-bold">
          {product.name}
        </h5>

        <p className="product-category">
          {product.category}
        </p>

        <div className="rating mb-2">
          ⭐⭐⭐⭐⭐ (4.8)
        </div>

        <h5 className="product-price">
          ₹ {product.price}
        </h5>

        <p className="mb-2">
          <strong>
            Select Size
          </strong>
        </p>

        <div className="d-flex gap-2 mb-3">

          {["S", "M", "L", "XL"].map(
            (size) => (
              <button
                key={size}
                className={`btn btn-sm size-btn ${
                  selectedSize === size
                    ? "btn-dark"
                    : "btn-outline-dark"
                }`}
                onClick={() =>
                  setSelectedSize(size)
                }
              >
                {size}
              </button>
            )
          )}

        </div>

        <div className="d-grid gap-2">

          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-dark"
          >
            View Details
          </Link>

          <button
            className="btn btn-dark"
            onClick={handleAddToCart}
          >
            🛒 Add To Cart
          </button>

        <button className="btn wishlist-btn" onClick={handleWishlist}>
             ❤️ Add To Wishlist
        </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;