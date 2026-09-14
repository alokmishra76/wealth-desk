import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { restoreSession } from './features/auth/authSlice';
import { AppRoutes } from './routes/AppRoutes';
import { useAppDispatch } from './app/hook';

function App() {
  const dispatch = useAppDispatch();

  /**
   * Fires exactly once, when the app first mounts (empty dependency
   * array). This is what makes "still logged in after a refresh"
   * actually work — without this dispatch, ProtectedRoute would only
   * ever see the initial 'idle' state and always redirect to /login,
   * even if a valid session is sitting in localStorage.
   *
   * We deliberately do NOT gate this on `status` — restoreSession
   * should run once, unconditionally, at boot. Gating it on status
   * would risk it silently not firing depending on render timing.
   */
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;