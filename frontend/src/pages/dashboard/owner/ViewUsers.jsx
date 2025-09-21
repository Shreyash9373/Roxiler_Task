import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const ViewUsers = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/ratings/my-store-users");
        setRatings(res.data);
      } catch (err) {
        console.error("Failed to fetch ratings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users Who Rated Store</h1>
      {loading ? (
        <p>Loading...</p>
      ) : ratings.length === 0 ? (
        <p>No users have rated your store yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">User Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Store</th>
                <th className="border p-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((r) => (
                <tr key={r.id}>
                  <td className="border p-2">{r.user?.name}</td>
                  <td className="border p-2">{r.user?.email}</td>
                  <td className="border p-2">{r.store?.name}</td>
                  <td className="border p-2">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
