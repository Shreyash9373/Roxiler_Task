import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data) => {
    try {
      await axiosInstance.patch("/auth/update-password", data);
      toast.success("Password updated successfully ✅");
      setServerError("");
      reset();
    } catch (err) {
      console.log("error", err);
      toast.error(err.response?.data?.message || "Failed to update password");
      setSuccess("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto bg-white shadow-md p-6 rounded-md"
    >
      <h2 className="text-xl font-bold text-center">Update Password</h2>

      {serverError && <p className="text-red-500">{serverError}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* Old Password */}
      <div>
        <label>Old Password:</label>
        <input
          type="password"
          className="border p-2 w-full"
          {...register("oldPassword", {
            required: "Old password is required",
          })}
        />
        {errors.oldPassword && (
          <p className="text-red-500">{errors.oldPassword.message}</p>
        )}
      </div>

      {/* New Password */}
      <div>
        <label>New Password:</label>
        <input
          type="password"
          className="border p-2 w-full"
          {...register("newPassword", {
            required: "New password is required",
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
                "Password must include 1 uppercase letter and 1 special character",
            },
          })}
        />
        <small className="text-gray-500">
          8–16 chars, 1 uppercase, 1 special character
        </small>
        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
      >
        Update Password
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
