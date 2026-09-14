/**
 * Small hand-written inline icons for the login form (mail, lock, and
 * the password show/hide eye). Deliberately not pulling in an icon
 * library for four glyphs — same reasoning as ClassNames.ts's `cn`:
 * not worth the dependency for something this small.
 */

export function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 10.5 7 10.5 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61C3.06 8.9 1.5 12 1.5 12s3.5 7 10.5 7a10.9 10.9 0 0 0 5.39-1.61M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}
