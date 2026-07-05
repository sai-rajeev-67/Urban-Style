import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./Home.css";

const Home = () => {

  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const response =
        await API.get("/products");

      const featuredProducts =
        [...response.data]
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);

      setProducts(
        featuredProducts
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <Banner />

      <div className="container">

        <div className="hero-section">

          <h1 className="hero-title">
            Welcome to UrbanStyle
          </h1>

          <p className="hero-subtitle">
            Discover the latest trends in
            Fashion, Electronics and
            Furniture.
          </p>

          <Link
            to="/products"
            className="btn btn-dark home-btn"
          >
            Browse Products
          </Link>

        </div>

        {/* Featured Categories */}

        <div className="text-center">
          <h2 className="section-title">
            Featured Categories
          </h2>
        </div>

        <div className="row">

          <div className="col-lg-4 col-md-6 mb-3">

            <Link
              to="/products?category=Men"
              className="text-decoration-none text-dark"
            >

              <div className="card category-card">

                <div className="card-body text-center">
                  👔 Men's Wear
                </div>

              </div>

            </Link>

          </div>

          <div className="col-lg-4 col-md-6 mb-3">

            <Link
              to="/products?category=Women"
              className="text-decoration-none text-dark"
            >

              <div className="card category-card">

                <div className="card-body text-center">
                  👗 Women's Wear
                </div>

              </div>

            </Link>

          </div>

          <div className="col-lg-4 col-md-6 mb-3">

            <Link
              to="/products?category=Kids"
              className="text-decoration-none text-dark"
            >

              <div className="card category-card">

                <div className="card-body text-center">
                  🧒 Kids
                </div>

              </div>

            </Link>

          </div>

          <div className="col-lg-4 col-md-6 mb-3">

            <Link
              to="/products?category=Accessories"
              className="text-decoration-none text-dark"
            >

              <div className="card category-card">

                <div className="card-body text-center">
                  👜 Accessories
                </div>

              </div>

            </Link>

          </div>

          <div className="col-lg-4 col-md-6 mb-3">

            <Link
              to="/products?category=Electronics"
              className="text-decoration-none text-dark"
            >

              <div className="card category-card">

                <div className="card-body text-center">
                  📱 Electronics
                </div>

              </div>

            </Link>

          </div>

          <div className="col-lg-4 col-md-6 mb-3">

            <Link
              to="/products?category=Furniture"
              className="text-decoration-none text-dark"
            >

              <div className="card category-card">

                <div className="card-body text-center">
                  🛋 Furniture
                </div>

              </div>

            </Link>

          </div>

        </div>

        {/* Featured Products */}

        <div className="mt-5">

          <div className="text-center">

            <h2 className="section-title">
              Featured Products
            </h2>

          </div>

          <div className="row">

            {products.map(
              (product) => (

                <div
                  key={product.id}
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                >

                  <ProductCard
                    product={product}
                  />

                </div>

              )
            )}

          </div>

          <div className="text-center mb-5">

            <Link
              to="/products"
              className="btn btn-dark"
            >
              View All Products
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Home;