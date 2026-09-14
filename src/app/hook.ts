
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Plain `useSelector`/`useDispatch` from react-redux are untyped —
 * every single usage would need `(state: RootState) => ...` written
 * out by hand, or worse, no typing at all. These two hooks bake the
 * store's types in ONCE, here, so every feature file just does:
 *   const user = useAppSelector((state) => state.auth.user);
 * and gets full autocomplete + type safety with zero repetition.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;