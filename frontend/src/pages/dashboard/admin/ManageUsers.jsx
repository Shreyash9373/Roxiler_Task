import React, { useEffect, useState } from "react";
import { getUsers, createUser } from "../../../api/authApi";

const ManageUsers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch users with filters
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers(filters);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Submit new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      setSuccess("User created successfully ✅");
      setServerError("");
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });
      fetchUsers(); // refresh list
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to create user");
      setSuccess("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {/* Add User Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded mb-6"
      >
        <h2 className="text-lg font-semibold">Add User/Admin</h2>
        {serverError && <p className="text-red-500">{serverError}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>

      {/* Filters */}
      <div className="mb-4 space-x-2">
        <input
          type="text"
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Filter by Address"
          value={filters.address}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          className="border p-2"
        >
          <option value="">All Roles</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      {/* Users Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="border-collapse border w-full">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {users?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-2">
                  No users found
                </td>
              </tr>
            ) : (
              users?.map((u) => (
                <tr key={u.id}>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.address}</td>
                  <td className="border p-2">{u.role}</td>
                  <td className="border p-2">
                    {u.role === "STORE_OWNER"
                      ? u.averageRating?.toFixed(1) || "0"
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
