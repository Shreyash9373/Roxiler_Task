import React, { useEffect, useState } from "react";
import { getStores, createStore } from "../../../api/authApi";
import { toast } from "react-toastify";

const ManageStores = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Fetch all stores
  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await getStores(filters);
      setStores(res.data);
    } catch (err) {
      toast.error("Failed to fetch stores");
      console.error("Failed to fetch stores:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [filters]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  // Submit new store
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStore(formData);
      toast.success("Store created successfully ");
      setFormData({ name: "", email: "", address: "" });
      fetchStores(); // refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create store");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Stores</h1>

      {/* Add Store Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded mb-6"
      >
        <h2 className="text-lg font-semibold">Add Store</h2>
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
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Store
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
      </div>
      {/* Stores Table */}
      {loading ? (
        <p>Loading stores...</p>
      ) : (
        <table className="border-collapse border w-full">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-2">
                  No stores found
                </td>
              </tr>
            ) : (
              stores.map((store) => (
                <tr key={store.id}>
                  <td className="border p-2">{store.name}</td>
                  <td className="border p-2">{store.email}</td>
                  <td className="border p-2">{store.address}</td>
                  <td className="border p-2">
                    {store.averageRating ? store.averageRating.toFixed(1) : "0"}
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

export default ManageStores;
