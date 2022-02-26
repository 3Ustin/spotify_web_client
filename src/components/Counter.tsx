import React from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { decrement, increment } from '../store/counterSlice'


/**
 * The counter component is a temporary component to demonstrate how
 * the Redux store can be accessed and how an action can be dispatched
 * from a component
 * 
 * Counter uses the decrement and increment actions to increment
 * and decrement the global counter value and reads that value from
 * the redux store using a selector
 */
function Counter() {

  const counter = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const handleDecrement = () => {
    dispatch(decrement())
  }
  const handleIncrement = () => {
    dispatch(increment())
  }

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      {counter}
      <button onClick={handleIncrement}>+</button>
    </div>
  )
}

export default Counter
