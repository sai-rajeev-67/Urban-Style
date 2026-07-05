import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductManagement = () => {
  const [products, setProducts] =
    useState([]);

  const fetchProducts = async () => {
    try {
      const response =
        await API.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/products/${id}`
      );

      fetchProducts();

     toast.success(
  "Product Deleted"
);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>
            Product Management
          </h2>

          <Link
            to="/admin/add-product"
            className="btn btn-dark"
          >
            + Add Product
          </Link>

        </div>

        <table className="table table-bordered table-striped shadow">

          <thead className="table-dark">

            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {products.map(
              (product) => (
                <tr
                  key={product.id}
                >
                  <td>
                    {product.id}
                  </td>

                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      width="60"
                      height="60"
                      style={{
                        objectFit:
                          "cover",
                      }}
                    />
                  </td>

                  <td>
                    {product.name}
                  </td>

                  <td>
                    {
                      product.category
                    }
                  </td>

                  <td>
                    ₹
                    {product.price}
                  </td>

                  <td>

                    <Link
  to={`/admin/edit-product/${product.id}`}
  className="btn btn-primary btn-sm me-2"
>
  Edit
</Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteProduct(
                          product.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      <Footer />
    </>
  );
};

export default ProductManagement;