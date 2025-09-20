import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/stats", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-xl font-semibold">Total Users</h3>
        <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
      </div>

      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-xl font-semibold">Total Stores</h3>
        <p className="text-3xl font-bold mt-2">{stats.totalStores}</p>
      </div>

      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-xl font-semibold">Total Ratings</h3>
        <p className="text-3xl font-bold mt-2">{stats.totalRatings}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
