import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";

const UserManagement = () => {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const response =
        await API.get("/users");

      setUsers(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2>
          User Management
        </h2>

        <table className="table table-bordered mt-4">

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>

          </thead>

          <tbody>

            {users.map(
              (user) => (
                <tr key={user.id}>
                  <td>
                    {user.id}
                  </td>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.email}
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

export default UserManagement;