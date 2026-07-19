import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";
import { toast } from "react-toastify";

const AdminLogin = () => {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
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

    try {

      const response =
        await API.get("/users");

      const users =
        response.data;

      const admin =
        users.find(
          (u) =>
            u.email === formData.email &&
            u.password === formData.password &&
            u.role === "admin"
        );

      if (!admin) {

        toast.error(
          "Invalid Admin Credentials"
        );

        return;

      }

      login(admin);

      toast.success(
        "Admin Login Successful"
      );

      navigate("/admin/dashboard");

    } catch (error) {

      console.log(error);

      toast.error(
        "Login Failed"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card p-4 shadow">

          <h2>
            Admin Login
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button
            className="btn btn-dark"
            onClick={handleSubmit}
          >
            Login
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default AdminLogin;