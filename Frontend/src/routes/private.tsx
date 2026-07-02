import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = document.cookie;

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
