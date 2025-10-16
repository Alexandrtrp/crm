import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '../store/store';

const PrivateRoute = () => {
  const location = useLocation();
  const token = useSelector((state: RootState) => state.auth.token);

  if (token === undefined) return ;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
