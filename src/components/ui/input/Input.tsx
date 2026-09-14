import { forwardRef, useId } from 'react';
import styles from './Input.module.css';
import type { InputProps } from './Input.types';
import { cn } from '../button/ClassNames';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      required,
      className,
      id,
      ...rest // value, onChange, type, placeholder, maxLength, disabled, name... all pass straight through
    },
    ref
  ) => {
    /**
     * useId generates a stable, unique id per component INSTANCE
     * (not per render) — critical because we'll have many Inputs on
     * one page (the loan wizard alone has 10+ fields). Without this,
     * every Input would need a manually-typed unique id, which is
     * exactly the kind of thing that gets forgotten or duplicated.
     */
    const autoId = useId();
    const inputId = id ?? autoId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const hasError = Boolean(error);
    // Only wire aria-describedby to something if there IS a message to point to —
    // pointing it at an empty/nonexistent element is worse than omitting it.
    const describedBy = hasError ? errorId : helperText ? helperId : undefined;

    return (
      <div className={cn(styles.wrapper, fullWidth && styles.fullWidth)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                {' '}
                *
              </span>
            )}
          </label>
        )}

        <div className={styles.fieldWrapper}>
          {leftIcon && (
            <span className={styles.iconLeft} aria-hidden="true">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              styles.input,
              styles[size],
              Boolean(leftIcon) && styles.withLeftIcon,
              Boolean(rightIcon) && styles.withRightIcon,
              hasError && styles.error,
              className
            )}
            required={required}
            // aria-invalid tells assistive tech (and testing tools) this field
            // currently fails validation — separate from just showing red text.
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            {...rest}
          />

          {rightIcon && (
            <span className={cn(styles.iconRight, styles.interactive)}>
              {rightIcon}
            </span>
          )}
        </div>

        {/* Only one of these renders at a time — error takes priority over helperText,
            so the user never sees conflicting/stale guidance at once. */}
        {hasError ? (
          <span id={errorId} className={styles.errorText} role="alert">
            {error}
          </span>
        ) : (
          helperText && (
            <span id={helperId} className={styles.helperText}>
              {helperText}
            </span>
          )
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';