import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'

const reducer = combineReducers({
  counter: counterSlice
})

const store = configureStore({
  reducer
})

const initialRootState = store.getState()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { reducer, initialRootState }
export default store
