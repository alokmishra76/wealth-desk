import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTE_PATHS } from './routePaths';
import { LoginPage as Login } from '../features/auth/components/LoginPage';
import ComingSoonPage from './ComingSoonPage';
import { PublicOnlyRoute } from './PublicOnlyRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public-only: redirects to /dashboard if already logged in */}
      <Route element={<PublicOnlyRoute />}>
        <Route path={ROUTE_PATHS.login} element={<Login />} />
      </Route>

      {/* Protected: redirects to /login if not authenticated.
          Every route nested under here shares ONE auth check. */}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTE_PATHS.dashboard} element={<ComingSoonPage title="Dashboard" />} />
        <Route path={ROUTE_PATHS.holdings} element={<ComingSoonPage title="Holdings" />} />
        <Route path={ROUTE_PATHS.applyLoan} element={<ComingSoonPage title="Apply for Loan" />} />
        <Route path={ROUTE_PATHS.transactions} element={<ComingSoonPage title="Transactions" />} />
      </Route>

      {/* Unknown paths -> send to dashboard (ProtectedRoute will bounce
          to /login itself if the user isn't actually authenticated) */}
      <Route path="*" element={<Navigate to={ROUTE_PATHS.dashboard} replace />} />
    </Routes>
  );
}