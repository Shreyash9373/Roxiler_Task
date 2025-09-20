import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
