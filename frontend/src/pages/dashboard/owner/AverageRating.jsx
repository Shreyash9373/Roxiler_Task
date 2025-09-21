import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const StoreAverage = () => {
  const [averages, setAverages] = useState([]);

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const res = await axiosInstance.get("/stores/my-store-average");
        setAverages(res.data);
      } catch (err) {
        console.error("Failed to fetch store average", err);
      }
    };
    fetchAverages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4"> Average Ratings of Store</h1>
      {averages.length === 0 ? (
        <p>No ratings found.</p>
      ) : (
        <ul className="space-y-2">
          {averages.map((s) => (
            <li key={s.id} className="p-4 border rounded shadow bg-white">
              <h2 className="font-semibold">{s.name}</h2>
              <p>Average Rating: {parseFloat(s.averageRating).toFixed(1)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoreAverage;
