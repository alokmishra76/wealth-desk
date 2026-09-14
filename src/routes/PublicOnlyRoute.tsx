import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hook';
import { ROUTE_PATHS } from './routePaths';

/**
 * The mirror image of ProtectedRoute: wraps PUBLIC-only pages (just
 * /login for now) so an already-authenticated user visiting /login
 * directly gets sent to /dashboard instead of seeing the login form
 * again — satisfies acceptance criterion #6 from the Module 0 spec.
 */
export function PublicOnlyRoute() {
  const status = useAppSelector((state) => state.auth.status);

  if (status === 'authenticated') {
    return <Navigate to={ROUTE_PATHS.dashboard} replace />;
  }

  return <Outlet />;
}
