import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'

/**
 * Returns a wrapper around useDispatch that sets the generic
 * type to our AppDispatch type so that TypeScript can infer
 * the type when we dispatch actions
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()