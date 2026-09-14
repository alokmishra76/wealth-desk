/**
 * A thin wrapper around localStorage, not raw localStorage calls
 * scattered through feature files. Reasons this matters:
 * 1. JSON.parse/stringify + try/catch would otherwise be repeated
 *    everywhere localStorage is touched.
 * 2. If we ever swap the underlying mechanism (e.g. add encryption,
 *    or migrate a key to IndexedDB), there's exactly one place to change.
 * 3. Centralizing key names here means no typo'd string keys scattered
 *    across the codebase.
 */

const AUTH_STORAGE_KEY = 'wealthdesk_auth';

export function saveAuthToStorage(data: unknown): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage can throw (private browsing, storage quota, disabled).
    // We deliberately swallow this — auth persistence failing shouldn't
    // crash the app; the user just won't stay logged in across a refresh.
  }
}

export function loadAuthFromStorage<T>(): T | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function clearAuthFromStorage(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // same reasoning as above
  }
}