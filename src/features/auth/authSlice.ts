import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { mockLoginRequest, mockOAuthLogin } from './authApi';
import type { AuthState, AuthUser, LoginCredentials } from './type';
import { clearAuthFromStorage, loadAuthFromStorage, saveAuthToStorage } from '../../services/storage/localStorage';

const initialState: AuthState = {
  status: 'idle',
  user: null,
  error: null,
};

/**
 * createAsyncThunk auto-generates three action types for us:
 * login.pending / login.fulfilled / login.rejected — we handle all
 * three below in extraReducers. This is what gives us the loading /
 * success / error states for free, matching the AuthStatus union.
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const user = await mockLoginRequest(credentials);
    return user;
  }
);

export const loginWithOAuth = createAsyncThunk('auth/loginWithOAuth', async () => {
  const user = await mockOAuthLogin();
  return user;
});

/**
 * Runs once when the app boots — checks if a previous session is
 * saved in localStorage and restores it. This is what satisfies
 * "auth state persists across a page refresh" from the BA spec.
 */
export const restoreSession = createAsyncThunk('auth/restoreSession', async () => {
  const saved = loadAuthFromStorage<AuthUser>();
  if (!saved) {
    throw new Error('No saved session.');
  }
  return saved;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = 'idle';
      state.user = null;
      state.error = null;
      clearAuthFromStorage();
    },
  },
  // extraReducers handles actions defined OUTSIDE this slice — in this
  // case, the three lifecycle actions each createAsyncThunk generates.
  extraReducers: (builder) => {
    builder
      // --- login ---
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = 'authenticated';
        state.user = action.payload;
        saveAuthToStorage(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Login failed.';
      })
      // --- OAuth login (same pattern, separate thunk) ---
      .addCase(loginWithOAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginWithOAuth.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = 'authenticated';
        state.user = action.payload;
        saveAuthToStorage(action.payload);
      })
      .addCase(loginWithOAuth.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'OAuth login failed.';
      })
      // --- restoreSession (silent — no loading spinner needed for this one) ---
      .addCase(restoreSession.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(restoreSession.rejected, (state) => {
        // No saved session — this is a normal, expected outcome, not an error.
        // We deliberately do NOT set status to 'error' here.
        state.status = 'idle';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;