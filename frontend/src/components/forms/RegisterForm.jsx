import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/authApi";

const RegisterForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      setSuccess("Registration successful! You can now log in.");
      setServerError("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Register</h2>
      {serverError && <p className="text-red-500">{serverError}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* Name */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          className="border p-2 w-full"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 20,
              message: "Name must be at least 20 characters",
            },
            maxLength: {
              value: 60,
              message: "Name cannot exceed 60 characters",
            },
          })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          className="border p-2 w-full"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label>Password:</label>
        <input
          type="password"
          className="border p-2 w-full"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            maxLength: {
              value: 16,
              message: "Password cannot exceed 16 characters",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
              message:
                "Password must include 1 uppercase and 1 special character",
            },
          })}
        />
        <small className="text-gray-500">
          8–16 chars, 1 uppercase, 1 special character
        </small>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label>Address:</label>
        <textarea
          className="border p-2 w-full"
          {...register("address", {
            maxLength: {
              value: 400,
              message: "Address cannot exceed 400 characters",
            },
          })}
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
