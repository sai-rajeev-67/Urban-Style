import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CartContext } from "../../context/CartContext";
import ReviewForm from "../reviews/ReviewForm";
import ReviewList from "../reviews/ReviewList";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } =
    useContext(CartContext);

  const [product, setProduct] =
    useState(null);

  const [selectedSize, setSelectedSize] =
    useState("");
 
    const [reviews, setReviews] =
  useState([]);

  useEffect(() => {
  fetchProduct();
  loadReviews();
}, []);
  const loadReviews = () => {
  const allReviews =
    JSON.parse(
      localStorage.getItem("reviews")
    ) || [];

  const filtered =
    allReviews.filter(
      (review) =>
        review.productId === Number(id)
    );

  setReviews(filtered);
};

  const fetchProduct = async () => {
    try {
      const response = await API.get(
        `/products/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      ...product,
      selectedSize,
    });

    alert("Added To Cart");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row">

          <div className="col-md-5">

            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow"
            />

          </div>

          <div className="col-md-7">

            <h2>{product.name}</h2>

            <h4 className="text-success mt-3">
              ₹ {product.price}
            </h4>

            <p className="mt-3">
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>
              This is a premium fashion product
              from UrbanStyle.
            </p>

            <h5 className="mt-4">
              Select Size
            </h5>

            <div className="d-flex gap-2 mb-4">

              {["S", "M", "L", "XL"].map(
                (size) => (
                  <button
                    key={size}
                    className={`btn ${
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

            <button
              className="btn btn-dark"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>

      <div className="container">

  <ReviewForm
    productId={Number(id)}
    onReviewAdded={loadReviews}
  />

  <ReviewList reviews={reviews} />

</div>

      <Footer />
    </>
  );
};

export default ProductDetails;