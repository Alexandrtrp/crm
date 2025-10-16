import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { WarehousePage } from "../pages/WarehousePage";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { TaskPage } from "../pages/TasksPage";

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
    element: <PrivateRoute />, 
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "warehouse", element: <WarehousePage /> },
          { path: "warehouse/:articleId", element: <WarehousePage /> },
          { path: "tasks", element: <TaskPage /> },
        ],
      },
    ],
  },
]);
