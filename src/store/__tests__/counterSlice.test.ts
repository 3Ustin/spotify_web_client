import reducer, { CounterState, increment, decrement, reset } from "../counterSlice"


const previousState: CounterState = {
  value: 10,
  resetCounter: 1
}


describe('#increment', () => {
  it('should return updated state with incremented value', () => {
    const expected: CounterState = {
      value: 11,
      resetCounter: 1
    }

    const actual = reducer(previousState, increment())

    expect(actual).toEqual(expected)
    expect(actual).not.toBe(previousState)
  })
})

describe('#decrement', () => {
  it('should return updated state with decremented value', () => {
    const expected: CounterState = {
      value: 9,
      resetCounter: 1
    }

    const actual = reducer(previousState, decrement())

    expect(actual).toEqual(expected)
    expect(actual).not.toBe(previousState)
  })
})

describe('#reset', () => {
  it('should return updated state with reset value and incremented reset counter', () => {
    const expected: CounterState = {
      value: 0,
      resetCounter: 2
    }

    const actual = reducer(previousState, reset())

    expect(actual).toEqual(expected)
    expect(actual).not.toBe(previousState)
  })
})