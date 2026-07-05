import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">

      <div>

        <div className="sale-badge">
          🔥 SUMMER SALE 2026
        </div>

        <h1 className="banner-title">
          UrbanStyle
        </h1>

        <p className="banner-subtitle">
          Discover Trendy Fashion,
          Lifestyle & Premium Collections
        </p>

        <h3 className="mb-4">
          Up To 50% OFF
        </h3>

        <Link
          to="/products"
          className="btn btn-light banner-btn"
        >
          Shop Now
        </Link>

      </div>

    </div>
  );
};

export default Banner;