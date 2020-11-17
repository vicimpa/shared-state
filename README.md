# Shared-State

## Public state for React components. Allows you to quickly and easily organize the flow of data between components

## Install
```bash
> npm install @vicimpa/shared-state
```

## Usage
This example shows how easy it is to use the same state in two or more components at the same time.
```jsx
import React from "react";
import { render } from "react-dom";
import { SharedState } from "@vicimpa/shared-state";

const myState = new SharedState({
  click1: 0,
  click2: 0
})

const Component1 = () => {
  const [state, setState] = myState.useState()

  const onClick = () => {
    setState({
      ...state, 
      click1: state.click1 + 1
    })
  }

  return (
    <div>
      <p>{JSON.stringify(state)}</p>
      <button onClick={onClick}>Click1</button>
    </div>
  )
}

const Component2 = () => {
  const [state, setState] = myState.useState()

  const onClick = () => {
    setState({
      ...state, 
      click2: state.click2 + 1
    })
  }

  return (
    <div>
      <p>{JSON.stringify(state)}</p>
      <button onClick={onClick}>Click2</button>
    </div>
  )
}

render((
  <div>
    <Component1 />
    <Component2 />
  </div>
), document.getElementById('root'))
```

## API
FAQ:
- T - Generic type for initial state
- SetStateAction - The type can be a new T, or a function that takes the current T and returns a new T.
- Dispatch - Callback that takes the current T on changes
```ts
class SharedState<T = any> {
  readonly state: T

  constructor(initialState?: T | (() => T))

  setState(newState: SetStateAction<T>): SharedState<T>
  useState(initialState?: T | (() => T)): [T, Dispatch<T>]
  onChange(callback: Dispatch<T>): SharedState<T>
  offChange(callback?: Dispatch<T>): SharedState<T>
}
```