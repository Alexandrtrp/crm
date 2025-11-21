import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { WarehousePage } from '../pages/WarehousePage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { TaskPage } from '../pages/TasksPage';
import { ProfilePage } from '../pages/ProfilePage';
import { Users } from '../components/Profile/Users';
import { CreateUser } from '../components/Profile/CreateUser';
import { InputPage } from '../pages/InputPage';
import { MovementGoodsForm } from '../components/InputForms/MovementGoodsForm';
import { InputPurchaseForm } from '../components/InputForms/InputPurchaseForm';
import { InputProductionForm } from '../components/InputForms/InputProductionForm';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'warehouse', element: <WarehousePage /> },
          { path: 'warehouse/:articleId', element: <WarehousePage /> },
          { path: 'tasks', element: <TaskPage /> },
          {
            path: 'profile',
            element: <ProfilePage />,
            children: [
              { path: 'users', element: <Users /> },
              { path: 'create-user', element: <CreateUser /> },
            ],
          },
          {
            path: '/input',
            element: <InputPage />,
            // children: [
            //   { path: 'production', element: <InputProductionForm /> },
            //   { path: 'purchase', element: <InputPurchaseForm /> },
            //   { path: 'purchase', element: <MovementGoodsForm /> },
            // ],
          },
        ],
      },
    ],
  },
]);
