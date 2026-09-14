import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Same principle as Button: extend the real native <input> attributes
 * instead of re-declaring value/onChange/type/placeholder/maxLength/etc
 * ourselves. This means <Input type="email" maxLength={50} /> just
 * works, with zero extra code on our end, and TypeScript validates it
 * against the real HTML spec.
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label above the field. Always prefer this over a placeholder-only field. */
  label?: string;

  /** Small helper text below the field, shown when there's no error. */
  helperText?: string;

  /**
   * Validation error message. When present:
   * - overrides helperText in what's displayed
   * - drives aria-invalid + red border styling
   * - is announced to screen readers via aria-describedby
   */
  error?: string;

  size?: InputSize;

  /** Stretches the input + its wrapper to fill the container width. */
  fullWidth?: boolean;

  /** Icon rendered inside the field, left side (e.g. a search icon). */
  leftIcon?: ReactNode;

  /** Icon or interactive element inside the field, right side (e.g. password toggle, clear button). */
  rightIcon?: ReactNode;
}