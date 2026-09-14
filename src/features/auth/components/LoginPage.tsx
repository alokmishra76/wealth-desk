import { useState, type ChangeEvent, type FormEvent } from 'react';
import { login, loginWithOAuth } from '../authSlice';
import styles from './LoginPage.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { validateLoginForm, type LoginFormErrors } from './Validation';
import { Button } from '../../../components/ui/button/Button';
import { Input } from '../../../components/ui/input/Input';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from './AuthIcons';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const serverError = useAppSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = status === 'loading';

  /**
   * Clears a field's error the moment the user edits it again — without
   * this, fixing a typo in the email field would still show "Enter a
   * valid email address" underneath until the next submit, which reads
   * as the form ignoring what you just typed.
   */
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (formErrors.email) {
      setFormErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (formErrors.password) {
      setFormErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  /**
   * We validate ON SUBMIT, not on every keystroke. Validating live
   * (on every onChange) is a common UX mistake — it means a user
   * gets yelled at with "Enter a valid email" while they're still
   * halfway through typing it. Submit-time validation respects that
   * the user isn't "done" with a field until they try to move past it.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credentials = { email, password };
    const errors = validateLoginForm(credentials);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(login(credentials));
    }
  };

  const handleOAuthClick = () => {
    dispatch(loginWithOAuth());
  };

  return (
    <div className={styles.page}>
      {/* Left: banner side — see LoginPage.module.css for how to swap
          this gradient for a real background image later */}
      <div className={styles.banner}>
        <div
          className={styles.decorCircle}
          style={{ width: 340, height: 340, top: -80, right: -80 }}
          aria-hidden="true"
        />
        <div
          className={styles.decorCircle}
          style={{ width: 200, height: 200, bottom: 40, left: -60 }}
          aria-hidden="true"
        />
        <div className={styles.bannerContent}>
          <div style={{ fontWeight: 700, fontSize: 20 }}>WealthDesk</div>
        </div>
        <div className={styles.bannerContent}>
          <div className={styles.bannerTitle}>
            Your investments and loans, in one place.
          </div>
          <div className={styles.bannerSubtitle}>
            Track holdings in real time and apply for financing — all from a
            single dashboard.
          </div>
        </div>
      </div>

      {/* Right: form side */}
      <div className={styles.formSide}>
        <div className={styles.formCard}>
          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.subheading}>Log in to continue to WealthDesk</p>

          {/* Server/thunk-level error (e.g. mock login rejected) — distinct
              from formErrors, which are field-level client validation */}
          {status === 'error' && serverError && (
            <div className={styles.formError} role="alert">
              {serverError}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              error={formErrors.email}
              disabled={isLoading}
              leftIcon={<MailIcon />}
              fullWidth
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={formErrors.password}
              disabled={isLoading}
              leftIcon={<LockIcon />}
              rightIcon={
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  // Toggling visibility isn't meaningful while there's nothing typed yet
                  disabled={isLoading || !password}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
              fullWidth
            />

            <Button type="submit" isLoading={isLoading} fullWidth>
              Log In
            </Button>
          </form>

          <div className={styles.divider}>or</div>

          <Button
            variant="outline"
            fullWidth
            isLoading={isLoading}
            onClick={handleOAuthClick}
          >
            Continue with mock OAuth
          </Button>
        </div>
      </div>
    </div>
  );
}