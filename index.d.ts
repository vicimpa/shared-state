declare module '@vicimpa/shared-state' {
  type SetStateAction<S> = S | ((prevState: S) => S)
  type Dispatch<A> = (value: A) => void

  export class SharedState<T = any> {
    readonly state: T

    constructor(initialState?: T | (() => T))

    setState(newState: SetStateAction<T>): SharedState<T>
    useState(initialState?: T | (() => T)): [T, Dispatch<T>]
    onChange(callback: Dispatch<T>): SharedState<T>
    offChange(callback?: Dispatch<T>): SharedState<T>
  }
}