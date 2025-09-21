import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpdatePasswordPage from "./pages/UpdatePassword";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import ManageUsers from "./pages/dashboard/admin/ManageUsers";
import ManageStores from "./pages/dashboard/admin/ManageStores";
import Stores from "./pages/dashboard/users/Stores";
import ViewUsers from "./pages/dashboard/owner/ViewUsers";
import AverageRating from "./pages/dashboard/owner/AverageRating";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          maxWidth: "300px",
          borderRadius: "4px",
          fontSize: "0.875rem",
          padding: "8px",
          color: "#050505",
          fontFamily: "sans-serif",
        }}
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/update-password" element={<UpdatePasswordPage />} />

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/manage-stores" element={<ManageStores />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/manage-users" element={<ManageUsers />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
              <Route path="/stores" element={<Stores />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["STORE_OWNER"]} />}>
              <Route path="/view-users" element={<ViewUsers />} />
              <Route path="/average-rating" element={<AverageRating />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
