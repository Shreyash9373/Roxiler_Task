import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user, logout } = useAuth();

  // 🔑 Define menus directly in this file
  const menus = {
    ADMIN: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/manage-users", label: "Manage Users" },
      { path: "/manage-stores", label: "Manage Store" },
    ],
    STORE_OWNER: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/manage-store", label: "Manage Store" },
      { path: "/products", label: "My Products" },
      { path: "/sales", label: "Sales Reports" },
    ],
    USER: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/profile", label: "My Profile" },
      { path: "/orders", label: "My Orders" },
    ],
  };

  // Pick menu based on logged-in user's role
  const menuItems = menus[user?.role] || [];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 fixed">
      <h2 className="text-lg font-bold mb-6">
        {user?.role === "ADMIN"
          ? "Admin Dashboard"
          : user?.role === "USER"
          ? "User Dashboard"
          : "Owner Dashboard"}
      </h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={logout}
          className="flex flex-col items-center justify-center px-4 py-3 text-red-400 hover:text-red-500"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
