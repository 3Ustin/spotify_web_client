import React from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { decrement, increment } from '../store/counterSlice'

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
