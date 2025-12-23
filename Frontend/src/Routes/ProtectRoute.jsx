// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // agar user logged in nahi hai -> login page
    return <Navigate to="/login" />;
  }

  // user logged in hai -> page show karo
  return children;
};

export default ProtectedRoute;
