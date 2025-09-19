import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    // After registration, redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <RegisterForm onSuccess={handleRegisterSuccess} />
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
