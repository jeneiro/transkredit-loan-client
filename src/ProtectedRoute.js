import React, { useState, useEffect } from "react";
import Login from "./login";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
 
  useEffect(() => {}, []);

  return isAuth.isAuthenticated ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
