import { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ChangePassword = () => {

  const { user, login } =
    useContext(AuthContext);

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleChangePassword =
    async () => {

      if (
        oldPassword !==
        user.password
      ) {

        toast.warning('Old password is incorrect');

        return;

      }

      if (
        newPassword !==
        confirmPassword
      ) {

        toast.warning(
  "Passwords do not match"
);

        return;

      }

      try {

        const updatedUser = {
          ...user,
          password:
            newPassword,
        };

        await API.put(
          `/users/${user.id}`,
          updatedUser
        );

        login(
          updatedUser
        );

       toast.success(
  "Password Changed Successfully"
);

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Change Password"
        );

      }

    };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card p-4 shadow">

          <h2>
            Change Password
          </h2>

          <input
            type="password"
            placeholder="Old Password"
            className="form-control mb-3"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="form-control mb-3"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control mb-3"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-dark"
            onClick={
              handleChangePassword
            }
          >
            Change Password
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ChangePassword;