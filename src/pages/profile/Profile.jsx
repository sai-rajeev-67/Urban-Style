import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./profile.css";
import { toast } from "react-toastify";

const Profile = () => {

  const { user } =
    useContext(AuthContext);

  const profile =
    user || {
      name: "User",
      email: "user@gmail.com",
      phone: "9999999999",
    };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card p-4 shadow border-0 profile-card">

          <div className="text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
              width="120"
              className="rounded-circle shadow profile-avatar"
            />

            <h2 className="mt-3 fw-bold">
              {profile.name}
            </h2>

            <p className="text-muted">
              UrbanStyle Member
            </p>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">

              <div className="card p-3 mb-3 bg-light border-0">

                <h6>Email</h6>

                <p className="mb-0">
                  {profile.email}
                </p>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card p-3 mb-3 bg-light border-0">

                <h6>Phone</h6>

                <p className="mb-0">
                  {profile.phone || "Not Added"}
                </p>

              </div>

            </div>

          </div>

          <div className="d-flex gap-3 mt-3">

            <Link
              to="/edit-profile"
              className="btn btn-dark"
            >
              ✏️ Edit Profile
            </Link>

            <Link
              to="/change-password"
              className="btn btn-outline-dark"
            >
              🔒 Change Password
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Profile;