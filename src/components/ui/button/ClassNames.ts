/**
 * Joins class names, dropping falsy values (false, undefined, '', 0).
 * Lets you write: cn(styles.base, isActive && styles.active, className)
 * This is the same job the popular `clsx` package does — writing it
 * yourself (it's ~4 lines) is a fine choice for a single utility like
 * this, and avoids taking on a dependency for something this small.
 */
export function cn(...classes: Array<string | false | undefined | null>): string {
  return classes.filter(Boolean).join(' ');
}