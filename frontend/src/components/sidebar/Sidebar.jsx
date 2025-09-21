import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();

  const menus = {
    ADMIN: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/manage-users", label: "Manage Users" },
      { path: "/manage-stores", label: "Manage Store" },
    ],
    STORE_OWNER: [
      { path: "/view-users", label: "View Users" },
      { path: "/average-rating", label: "Average Rating" },
    ],
    USER: [
      { path: "/stores", label: "View Stores" },
      { path: "/update-password", label: "Update Password" },
    ],
  };

  const menuItems = menus[user?.role] || [];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="p-4 flex justify-between items-center md:block">
          <h2 className="text-lg font-bold">
            {user?.role === "ADMIN"
              ? "Admin Dashboard"
              : user?.role === "USER"
              ? "User Dashboard"
              : "Owner Dashboard"}
          </h2>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block py-2 px-4 hover:bg-gray-700 rounded"
                  onClick={() => setIsOpen(false)} // close sidebar on nav click
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={logout}
            className="mt-6 w-full px-4 py-2 border bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer "
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
