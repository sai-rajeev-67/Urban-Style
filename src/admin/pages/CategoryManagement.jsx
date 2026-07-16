import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://urban-style-api.onrender.com/categories";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, {
          name: categoryName,
        });
      } else {
        await axios.post(API_URL, {
          name: categoryName,
        });
      }

      setCategoryName("");
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Category Management</h2>

      <div className="card p-3 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <button className="btn btn-primary w-100">
                {editingId ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card p-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;