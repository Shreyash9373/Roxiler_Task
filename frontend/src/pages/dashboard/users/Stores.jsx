import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { FaStar } from "react-icons/fa";
import storeImage from "/images/store_image.png";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/stores/with-ratings", {
        params: filters,
      });
      setStores(res.data);
    } catch (err) {
      setServerError("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const handleRating = async (storeId, value, currentRating) => {
    try {
      if (currentRating === value) {
        await axiosInstance.post(`/stores/${storeId}/rate`, { value: null });
      } else {
        await axiosInstance.post(`/stores/${storeId}/rate`, { value });
      }
      fetchStores();
    } catch (err) {
      console.error("Failed to submit rating", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stores</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Search by Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Search by Address"
          value={filters.address}
          onChange={(e) => setFilters({ ...filters, address: e.target.value })}
          className="border p-2 rounded flex-1"
        />
      </div>

      {serverError && <p className="text-red-500">{serverError}</p>}
      {loading && <p>Loading stores...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.length === 0 && !loading ? (
          <p>No stores found.</p>
        ) : (
          stores.map((store) => (
            <div
              key={store.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={storeImage}
                alt={store.name}
                className="w-full h-40 object-cover mt-2"
              />

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold">{store.name}</h2>
                <p className="text-gray-600">{store.address}</p>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    ⭐ Average Rating:{" "}
                    <span className="font-bold">
                      {store.averageRating === "NaN"
                        ? "0"
                        : store.averageRating}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Your Rating:{" "}
                    {store.userRating ? (
                      <span className="font-bold">{store.userRating}</span>
                    ) : (
                      "Not rated"
                    )}
                  </p>
                </div>

                <div className="flex mt-3 space-x-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FaStar
                      key={value}
                      size={24}
                      className={`cursor-pointer ${
                        value <= (store.userRating || 0)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() =>
                        handleRating(store.id, value, store.userRating)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Stores;
