import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = document.cookie;

  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;
