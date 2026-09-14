import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import { useAppSelector } from '../app/hook';

/**
 * Guards every protected route in the app. Rendered as a layout route
 * wrapping children via <Outlet /> — so this ONE component protects
 * dashboard, holdings, apply, and transactions, rather than each page
 * needing its own auth check copy-pasted in.
 *
 * The 'loading' case is the detail most implementations get wrong:
 * on a hard refresh, we don't YET know if there's a saved session —
 * restoreSession() is still running. If we redirected to /login
 * immediately during that window, a genuinely logged-in user would
 * see a flash of the login page before bouncing back to /dashboard.
 * So 'loading' renders a neutral loading state and waits, instead of
 * assuming "not authenticated yet" means "never will be".
 */
export function ProtectedRoute() {
  const status = useAppSelector((state) => state.auth.status);

  if (status === 'loading') {
    return <div role="status" aria-live="polite">Checking your session…</div>;
  }

  if (status !== 'authenticated') {
    return <Navigate to={ROUTE_PATHS.login} replace />;
  }

  return <Outlet />;
}