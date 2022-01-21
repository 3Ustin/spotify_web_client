import { createSlice } from '@reduxjs/toolkit'

interface CounterState {
  value: number
  resetCounter: number
}

const initialState = {
  value: 0,
  resetCounter: 0
} as CounterState

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
