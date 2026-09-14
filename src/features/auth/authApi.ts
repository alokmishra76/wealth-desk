import type { AuthUser, LoginCredentials } from './type';

/**
 * No real backend exists, but this function is written the way a real
 * API call would be — it returns a Promise, can reject, and has a
 * network-like delay. This matters because it means when you DO
 * eventually swap this for a real fetch() call, nothing calling this
 * function (the thunk, the component) needs to change at all.
 */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockLoginRequest(
  credentials: LoginCredentials
): Promise<AuthUser> {
  await delay(700); // simulates real network latency

  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required.');
  }

  // No real validation against a backend — any non-empty email/password
  // "succeeds", per the BA spec (mock auth, no backend for this project).
  return {
    id: crypto.randomUUID(),
    name: credentials.email.split('@')[0],
    email: credentials.email,
  };
}

/**
 * Simulates the "Continue with mock OAuth" button — a redirect-based
 * flow condensed into one function call. Structured as its own function
 * (not reusing mockLoginRequest) so that swapping in a REAL OAuth
 * provider later only means replacing this one function's internals —
 * nothing in the slice or the component needs to change.
 */
export async function mockOAuthLogin(): Promise<AuthUser> {
  await delay(900);

  return {
    id: crypto.randomUUID(),
    name: 'Demo User',
    email: 'demo.user@wealthdesk.app',
  };
}