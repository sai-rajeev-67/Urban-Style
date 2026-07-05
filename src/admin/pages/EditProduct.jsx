import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

const EditProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState({
      name: "",
      category: "",
      price: "",
      image: "",
    });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {

    try {

      const response =
        await API.get(
          `/products/${id}`
        );

      setProduct(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(
        `/products/${id}`,
        product
      );

      toast.success("Product Updated ")
      navigate(
        "/admin/products"
      );

    } catch (error) {

      console.log(error);

      toast.error("Update Failed");

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow p-4">

          <h2 className="mb-4">
            Edit Product
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={
                product.name
              }
              className="form-control mb-3"
              onChange={
                handleChange
              }
              required
            />

            <select
              name="category"
              value={
                product.category
              }
              className="form-select mb-3"
              onChange={
                handleChange
              }
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Men">
                Men
              </option>

              <option value="Women">
                Women
              </option>

              <option value="Accessories">
                Accessories
              </option>

              <option value="Footwear">
                Footwear
              </option>

            </select>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={
                product.price
              }
              className="form-control mb-3"
              onChange={
                handleChange
              }
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={
                product.image
              }
              className="form-control mb-3"
              onChange={
                handleChange
              }
              required
            />

            <button
              className="btn btn-dark"
            >
              Update Product
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default EditProduct;