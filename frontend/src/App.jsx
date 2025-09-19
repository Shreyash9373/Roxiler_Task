import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpdatePasswordPage from "./pages/UpdatePassword";

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
        <Route path="/update-password" element={<UpdatePasswordPage />} />

        {/* <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manageCategory" element={<ManageCategory />} />
              <Route path="/manageProducts" element={<ManageProduct />} />
              <Route path="/manageProducts/:id" element={<ProductDetails />} />
              <Route path="/manageVendor" element={<ManageVendor />} />
              <Route path="/manageOrder" element={<ManageOrder />} />

              <Route path="/manageVendor/:id" element={<VendorDetails />} />
              <Route path="/manageUser" element={<ManageUser />} />
            </Route> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};

export default App;
