import React, { createContext, useEffect, useContext, useCallback, useRef } from 'react'
import { parseHashKey, getHashKey } from '../../utils'

enum keyEvent {
  Space = 'Space',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Enter = 'Enter',
}

interface Hash {
  register: (key: string, ref: React.RefObject<HTMLElement>) => void
  element: (key: string) => HTMLElement
  map: Map<string, React.RefObject<HTMLElement>>
}

const hash: Hash = (() => {
  const cache = new Map()
  const register = (key: string, ref: React.RefObject<HTMLElement>) => {
    cache.set(key, ref)
  }

  const element = (key: string): HTMLElement => cache.get(key).current

  return {
    get map() {
      return cache
    },
    register,
    element,
  }
})()

const Context = createContext(hash)

const increment = (value: number, fallback: number): number => (value + 1 > fallback ? fallback : value + 1)
const decrement = (value: number, fallback: number): number => (value - 1 < fallback ? fallback : value - 1)

const KeybordHandler: React.FC = ({ children }) => {
  const ctx = useContext(Context)
  const lastCoords = useRef('1:1')

  const keyUpHandler = useCallback(
    ({ code }) => {
      if ([keyEvent.Space, keyEvent.Enter].includes(code)) {
        const elem = ctx.element(lastCoords.current)

        if (elem != null) {
          elem.click()
        }

        return
      }

      const size = Math.sqrt(ctx.map.size) - 1
      let [x, y] = parseHashKey(lastCoords.current)

      if (code === keyEvent.ArrowDown) {
        y = increment(y, size)
      }

      if (code === keyEvent.ArrowUp) {
        y = decrement(y, 0)
      }

      if (code === keyEvent.ArrowRight) {
        x = increment(x, size)
      }

      if (code === keyEvent.ArrowLeft) {
        x = decrement(x, 0)
      }

      const resultCoords = getHashKey(x, y)

      if (resultCoords === lastCoords.current) {
        return;
      }

      lastCoords.current = resultCoords

      const elem = ctx.element(resultCoords)

      if (elem != null) {
        elem.focus()
      }
    },
    [lastCoords.current],
  )

  useEffect(() => {
    ctx.element(lastCoords.current).focus()
    window.addEventListener('keyup', keyUpHandler)

    return () => {
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return <>{children}</>
}

export const KeybordControl: React.FC = ({ children }) => (
  <Context.Provider value={hash}>
    <KeybordHandler>{children}</KeybordHandler>
  </Context.Provider>
)

export const withHashed = <P extends { coord: string }>(WrappedComponent: React.ComponentType<P>) => (props: P) => {
  const cellRef = React.createRef<HTMLElement>();
  const ctx = useContext(Context);

  useEffect(() => {
    ctx.register(props.coord, cellRef)
  })

  return <WrappedComponent {...props} ref={cellRef} />
};
