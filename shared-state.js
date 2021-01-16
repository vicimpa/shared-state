const { useState, useEffect } = require('react')

function SharedState(state) {
  if(typeof state == 'function')
    state = state()

  if (!new.target)
    throw new Error('You need call SharedState with new keyword!')

  /** @type {Array<(state) => void>} */
  const dispatchList = []
  const symbol = Symbol('listener')
  const setState = (state) => { this.setState(state) }

  Object.defineProperty(this, 'state', {
    get() { return state },
    set(v) { console.warn(`You cant set property state. You need use setState method.`) }
  })

  Object.defineProperty(this, 'setState', {
    value(newState) {
      if(typeof newState == 'function')
        newState = newState(state)

      state = newState
      dispatchList.forEach(e => {
        if (e[symbol])
          e.call(this, newState)
        else
          e(newState)
      })
      return this
    }
  })

  Object.defineProperty(this, 'useState', {
    value(newState = state) {
      if(typeof newState == 'function')
        newState = newState()
        
      const [nowState, dispatcher] = useState(newState)

      useEffect(() => {
        if (newState !== state)
          this.setState(newState)

        dispatchList.push(dispatcher)

        return () => {
          const index = dispatchList.indexOf(dispatcher)

          if (index !== -1)
            dispatchList.splice(index, 1)
        }
      }, [])

      return [nowState, setState]
    }
  })

  Object.defineProperty(this, 'onChange', {
    value(callback) {
      callback[symbol] = true
      dispatchList.push(callback)
      return this
    }
  })

  Object.defineProperty(this, 'offChange', {
    value(callback) {
      if (!callback)
        while (callback = dispatchList.find(e => e[symbol]))
          this.offChange(callback)

      let index = -1

      while ((index = dispatchList.indexOf(callback)) !== -1)
        dispatchList.splice(index, 1)

      return this
    }
  })
}

exports.SharedState = SharedState
