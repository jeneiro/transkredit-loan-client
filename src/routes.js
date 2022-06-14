import React, { useContext } from "react";
import { Routes, Route } from "react-router";
import Login from "./login";

import Layout from "./layout";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./forgotPassword";
export default function NavRoutes() {
  
 
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/forgotPassword"} element={<ForgotPassword />} />
     <Route element={<ProtectedRoute/>}>

      <Route path={"/app/*"} element={<Layout />} />
     
      </Route> 
    
       <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}
