import { Navigate, Outlet } from "react-router-dom";

// Функция проверки авторизации (можно заменить на свою логику)
const isAuthenticated = () => {
  return true
  // localStorage.getItem("token") !== null;  // пример через localStorage
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
