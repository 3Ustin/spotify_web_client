import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '../store'

/**
 * Types the useSelector hook to use our RootState type
 * for the generic. This will allow TypeScript to infer the type
 * of our state when we write selectors
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
