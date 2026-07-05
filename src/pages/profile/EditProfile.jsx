import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";
import { toast } from "react-toastify";

const EditProfile = () => {

  const navigate =
    useNavigate();

  const {
    user,
    login,
  } = useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      name:
        user?.name || "",
      email:
        user?.email || "",
      phone:
        user?.phone || "",
      password:
        user?.password || "",
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

      await API.put(
        `/users/${user.id}`,
        formData
      );

      login(formData);

     toast.success(
  "Profile Updated Successfully"
);

      navigate(
        "/profile"
      );

    } catch (error) {

      console.log(error);

      toast.error(
  "Failed to update profile"
);

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card p-4 shadow">

          <h2>
            Edit Profile
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            value={formData.name}
            onChange={
              handleChange
            }
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="form-control mb-3"
            value={formData.phone}
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
            Save Changes
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default EditProfile;