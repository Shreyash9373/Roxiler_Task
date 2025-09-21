import { NavLink, useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-2">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <LoginForm />
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
