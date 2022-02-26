import { createSlice } from '@reduxjs/toolkit'

interface CounterState {
  value: number
  resetCounter: number
}

/**
 * Initial counter state
 * 
 * We create the counter with an initial value of 0 and an
 * initial resetCounter value of 0
 */
const initialState = {
  value: 0,
  resetCounter: 0
} as CounterState

/**
 * Creates a slice that holds the initial state needed for our Counter
 * as well as defining how increment, decrement, and reset actions will
 * return us a new state
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: (state) => ({
      ...state,
      value: state.value + 1
    }),
    decrement: (state) => ({
      ...state,
      value: state.value - 1
    }),
    reset: (state) => ({
      value: 0,
      resetCounter: state.resetCounter + 1
    })
  }
})

export const { increment, decrement, reset } = counterSlice.actions
export type { CounterState }
export default counterSlice.reducer
