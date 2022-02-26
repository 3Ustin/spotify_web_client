import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'

/**
 * Creates the root reducer that is a combination of all other reducers in our app
 */
const reducer = combineReducers({
  counter: counterSlice
})

/**
 * Creates a store with our root reducer
 */
const store = configureStore({
  reducer
})

/**
 * Gets the starting state so it can be exported and used for tests
 */
const initialRootState = store.getState()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { reducer, initialRootState }
export default store
