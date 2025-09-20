import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = () => {
    // Update global auth state
    // login({ loggedIn: true });
    // Redirect to dashboard (or home)
    // navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <LoginForm onSuccess={handleLoginSuccess} />
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <NavLink to="/register" className="text-blue-600 hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
