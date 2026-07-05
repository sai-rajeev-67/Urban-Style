import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/api";
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./productlist.css";


const ProductList = () => {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [searchParams] =
    useSearchParams();

  const [category, setCategory] =
    useState(
      searchParams.get("category") ||
      "All"
    );

  const [priceRange, setPriceRange] =
    useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const response =
        await getProducts();

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }

  };



  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesPrice =
        priceRange === "All"
          ? true
          : priceRange === "1000"
          ? Number(product.price) < 1000
          : priceRange === "2000"
          ? Number(product.price) >= 1000 &&
            Number(product.price) <= 2000
          : Number(product.price) > 2000;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );

    });

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="text-center mb-4">
          All Products
        </h2>

        <div className="card filter-card shadow-sm p-4 mb-4">

          <h4 className="filter-title mb-3">
            🔍 Search & Filters
          </h4>

          <div className="row">

            <div className="col-md-4 mb-3">

              <input
                type="text"
                className="form-control search-box"
                placeholder="Search Products..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="col-md-4 mb-3">

              <select
                className="form-select filter-select"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Categories
                </option>

                <option value="Men">
                  Men
                </option>

                <option value="Women">
                  Women
                </option>

                <option value="Kids">
                  Kids
                </option>

                <option value="Accessories">
                  Accessories
                </option>

                <option value="Footwear">
                  Footwear
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Furniture">
                  Furniture
                </option>

              </select>

            </div>

            <div className="col-md-4 mb-3">

              <select
                className="form-select filter-select"
                value={priceRange}
                onChange={(e) =>
                  setPriceRange(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Prices
                </option>

                <option value="1000">
                  Below ₹1000
                </option>

                <option value="2000">
                  ₹1000 - ₹2000
                </option>

                <option value="3000">
                  Above ₹2000
                </option>

              </select>

            </div>

          </div>

        </div>

        <h5 className="product-count mb-4">
          Products Found: {filteredProducts.length}
        </h5>

        <div className="row">

          {filteredProducts.length === 0 ? (

            <div className="text-center mt-5">

              <h4>
                No Products Found
              </h4>

            </div>

          ) : (

            filteredProducts.map(
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
            )

          )}

          

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ProductList;