import { forwardRef } from 'react';
import { cn } from './ClassNames';
import styles  from './button.module.css'
import type { ButtonProps } from './Button.types';

/**
 * forwardRef matters here: a parent might need the raw DOM node —
 * e.g. to call .focus() after a validation error, or to measure it
 * for a tooltip position. Without forwardRef, ref={...} on <Button>
 * would silently do nothing, and that's a hard bug to spot later.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      ...rest // every remaining native <button> prop (onClick, type, aria-*, form...)
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={cn(
          styles.base,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          className // caller can still add one-off overrides
        )}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        <span className={styles.contentWrapper}>
          {isLoading && (
            <span className={styles.spinnerWrapper}>
              <span className={styles.spinner} aria-hidden="true" />
            </span>
          )}
          <span className={cn(styles.label, isLoading && styles.labelHidden)}>
            {leftIcon}
            {children}
            {rightIcon}
          </span>
        </span>
      </button>
    );
  }
);

// Needed because forwardRef components lose their name in DevTools otherwise
Button.displayName = 'Button';
