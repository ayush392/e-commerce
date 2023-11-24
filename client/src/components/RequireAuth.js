import { useSelector } from "react-redux";
import { selectToken } from "../redux/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const token = localStorage.getItem("eCommerceUser")
    ? JSON.parse(localStorage.getItem("eCommerceUser")).token
    : null;
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
