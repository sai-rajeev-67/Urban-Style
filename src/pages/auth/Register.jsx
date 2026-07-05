import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";
import { toast } from "react-toastify";

const Register = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      toast.warning("Fill all fields");
      return;
    }

    try {

      const response =
        await API.get(
          "/users"
        );

      const users =
        response.data;

      const exists =
        users.find(
          (user) =>
            user.email ===
            formData.email
        );

      if (exists) {

        toast.error(
  "Email already registered"
);

        return;

      }

      await API.post(
        "/users",
        formData
      );

    toast.success(
  "Registration Successful"
);

      navigate(
        "/login"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Registration Failed"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card p-4 shadow">

          <h2>
            Register
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            onChange={
              handleChange
            }
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={
              handleChange
            }
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={
              handleChange
            }
          />

          <button
            className="btn btn-dark"
            onClick={
              handleSubmit
            }
          >
            Register
          </button>

          <p className="mt-3">

            Already have an account?

            <Link
              to="/login"
              className="ms-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Register;