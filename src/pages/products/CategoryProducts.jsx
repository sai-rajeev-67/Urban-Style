import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

const CategoryProducts = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://urban-style-api.onrender.com/products"
      );

      const filteredProducts = res.data.filter(
        (product) =>
          product.category?.toLowerCase() ===
          category?.toLowerCase()
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        {category} Products
      </h2>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              className="col-md-3 mb-4"
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;