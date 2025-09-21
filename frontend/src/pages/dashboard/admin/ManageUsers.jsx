import React, { useEffect, useState } from "react";
import { getUsers, createUser } from "../../../api/authApi";
import { toast } from "react-toastify";

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      toast.success("User created successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create user");
      setSuccess("");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-full overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {/* Add User Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded mb-6 bg-white shadow-sm w-full max-w-full"
      >
        <h2 className="text-lg font-semibold">Add User/Admin</h2>
        {success && <p className="text-green-500">{success}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="w-full min-w-0">
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="w-full min-w-0">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="w-full min-w-0">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="w-full min-w-0">
            <label className="block mb-1">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STORE_OWNER">OWNER</option>
            </select>
          </div>

          <div className="md:col-span-2 w-full min-w-0">
            <label className="block mb-1">Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Add User
        </button>
      </form>

      {/* Filters */}
      <div className="mb-4 flex flex-col md:flex-row gap-2 w-full">
        <input
          type="text"
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full md:flex-1"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full md:flex-1"
        />
        <input
          type="text"
          name="address"
          placeholder="Filter by Address"
          value={filters.address}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full md:flex-1"
        />
        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full md:flex-1"
        >
          <option value="">All Roles</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="STORE_OWNER">OWNER</option>
        </select>
      </div>

      {/* Users Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="border-collapse border w-full text-sm">
            <thead className="bg-gray-100">
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
                  <td colSpan="5" className="text-center p-2">
                    No users found
                  </td>
                </tr>
              ) : (
                users?.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="border p-2">{u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.address}</td>
                    <td className="border p-2">{u.role}</td>
                    <td className="border p-2 text-center">
                      {u.role === "STORE_OWNER"
                        ? u.averageRating?.toFixed(1) || "0"
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
