import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { Suspense, useEffect, memo } from "react";
import "./App.css";
//======== tostify =======
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {
  AdminRoutes, 
  AdminLogin,
} from "./imports";


function App() {
  const { isAdminLoggedIn } = useSelector((state) => state.admin);

  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));



  return (
      <BrowserRouter>
        <Routes>
          {/* Admin routes */}
          <Route
            path="/*"
            element={
              <Suspense
                fallback={
                  <div className="py-52 flex justify-center items-center">
                    <div className="loader"></div>
                  </div>
                }
              >
                {isAdminLoggedIn || adminToken ? (
                  <AdminRoutes />
                ) : (
                  <AdminLogin />
                )}
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
