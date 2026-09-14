import type { LoginCredentials } from "../type";


export interface LoginFormErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Pure function, no React/Redux involved — easy to unit test on its
 * own later, and reusable if a second form ever needs the same rules.
 */
export function validateLoginForm(credentials: LoginCredentials): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!credentials.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(credentials.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!credentials.password) {
    errors.password = 'Password is required.';
  } else if (credentials.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}