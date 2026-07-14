import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { auth } = useAuth();

   return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
