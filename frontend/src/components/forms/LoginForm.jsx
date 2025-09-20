import React, { useState } from "react";
import { loginUser } from "../../api/authApi";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      login(res.user);
      navigate("/dashboard");
      toast.success("Login successful");

      if (onSuccess) onSuccess(); // callback to parent page
    } catch (err) {
      //setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded-xs"
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded-xs"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
