/**
 * A discriminated union, not a boolean. If we used `isLoading: boolean`
 * + `isAuthenticated: boolean` as two separate flags, they could get
 * out of sync (e.g. both true at once — a state that shouldn't exist
 * but nothing stops it). A union makes invalid states impossible to
 * represent: the app can ONLY ever be in exactly one of these four.
 */
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
  error: string | null;
}

/** Shape of the fake credentials form submits. */
export interface LoginCredentials {
  email: string;
  password: string;
}