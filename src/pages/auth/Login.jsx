import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";
import { toast } from "react-toastify";

const Login = () => {

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

      const user =
        users.find(
          (u) =>
            u.email ===
              formData.email &&
            u.password ===
              formData.password
        );

      if (!user) {

        toast.error(
  "Invalid Email or Password"
);

        return;

      }

      login(user);

       toast.success(
  "Login Successful"
);
      navigate("/");

    } catch (error) {

      console.log(error);

     toast.error("Login Failed");

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card p-4 shadow">

          <h2>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
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

          <p className="mt-3">

            Don't have an account?

            <Link
              to="/register"
              className="ms-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Login;