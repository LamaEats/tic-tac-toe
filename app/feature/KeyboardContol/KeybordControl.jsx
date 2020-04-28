import React, { createContext, useRef, useEffect, useContext, useState, useCallback } from 'react'
import { parseHashKey, getHashKey } from '../../utils'

const keyEvent = {
  Space: 'Space',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  Enter: 'Enter'
}

class HashMap {
  #hash = new Map()

  register = (coord, ref) => this.#hash.set(coord, ref)

  hash = () => this.#hash

  element = (coord) => this.#hash.get(coord)
}

const Context = createContext()

const KeybordHandler = ({ children }) => {
  const ctx = useContext(Context)
  const [focused, setFocused] = useState(null)

  const keyUpHandler = useCallback(({ code }) => {
    let [y, x] = parseHashKey(focused)

    if ([keyEvent.Space, keyEvent.Enter].includes(code)) {
      const elem = ctx.element(focused)

      if (elem && elem.current) {
        elem.current.click()
      }

      return
    }


    if (code === keyEvent.ArrowDown) {
      y = y + 1 > 2 ? 2 : y + 1
    }

    if (code === keyEvent.ArrowUp) {
      y = y - 1 < 0 ? 0 : y - 1
    }

    if (code === keyEvent.ArrowRight) {
      x = x + 1 > 2 ? 2 : x + 1
    }

    if (code === keyEvent.ArrowLeft) {
      x = x - 1 < 0 ? 0 : x - 1
    }

    setFocused(getHashKey(y, x))
  })

  useEffect(() => {
    window.addEventListener('keyup', keyUpHandler)

    return () => {
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [ctx, focused])

  useEffect(() => {
    if (focused == null) {
      setFocused('0:0')
    }

    if (focused) {
      const elem = ctx.element(focused)

      if (elem && elem.current) {
        elem.current.focus()
      }
    }
  }, [focused])

  return children
}

export const KeybordControl = ({ children }) => (
  <Context.Provider value={new HashMap}>
    <KeybordHandler>
      {children}
    </KeybordHandler>
  </Context.Provider>
)

export const withHashed = (WrappedComponent) => (props) => {

  const cellRef = useRef(null)
  const ctx = useContext(Context)

  useEffect(() => {
    if (cellRef) {
      ctx.register(props.coord, cellRef)
    }
  }, [ctx, cellRef])

  return <WrappedComponent {...props} ref={cellRef} />
}
