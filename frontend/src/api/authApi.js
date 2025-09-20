import axiosInstance from "../utils/axiosInstance";

// Register new user
export const registerUser = async (userData) => {
  const res = await axiosInstance.post("/auth/register", userData, {
    withCredentials: true, // ✅ allow cookies
  });
  return res.data;
};

// Login user
export const loginUser = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData, {
    withCredentials: true, // ✅ allow cookies
  });
  return res.data;
};

export const createUser = async (userData) => {
  const res = await axiosInstance.post("/users", userData, {
    withCredentials: true,
  });
  return res.data;
};

export const getUsers = async (filters) => {
  console.log("Filters in API:", filters);
  const res = await axiosInstance.get("/users", {
    params: filters,
    withCredentials: true,
  });
  return res;
};
export const createStore = async (data) => {
  return await axiosInstance.post("/stores", data, {
    withCredentials: true,
  });
};

export const getStores = async (filters) => {
  return await axiosInstance.get("/stores", {
    params: filters,
    withCredentials: true,
  });
};
