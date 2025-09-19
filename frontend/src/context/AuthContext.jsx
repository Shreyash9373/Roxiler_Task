import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store logged-in user
  const [loading, setLoading] = useState(true);

  // On mount, try fetching current user (if cookie exists)
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axiosInstance.get("/auth/me"); // 🔥 backend should expose this route
  //       setUser(res.data);
  //     } catch (err) {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout"); // clear cookie on backend
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
