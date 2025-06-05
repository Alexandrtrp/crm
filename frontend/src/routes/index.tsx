import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";  // <-- импортируем
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { WarehousePage } from "../pages/WarehousePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <PrivateRoute />,   // Все остальные маршруты за Protected
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          // { path: "profile", element: <ProfilePage /> },
          { path: "warehouse", element: <WarehousePage /> },
          // { path: "tasks", element: <TasksPage /> },
        ],
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
]);
