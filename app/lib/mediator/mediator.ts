import { Module, Getters, Actions, Handlers, Reducer } from './typings'
import { createSelector } from './createSelector'
import { namespacedActionCreator } from './actionCreator'
import { namespacedActionHandler } from './actionHandler'

interface State {
  [key: string]: any;
}

export const createModule = <S extends State, N extends string>(namespace: N, initialState: S): Module<S, N> => {
  const stateKeys = Object.keys(initialState) as (keyof S)[]
  const actionCreator = namespacedActionCreator(namespace)
  const actionHandler = namespacedActionHandler(namespace)

  const get = (state => state[namespace]) as Getters<S, N>

  const set = {
    reset: actionCreator('reset', () => undefined),
  } as Actions<S>

  const handlers = ({
    reset: () => initialState,
  } as unknown) as Handlers<S>

  stateKeys.forEach(key => {
    Object.defineProperty(get, key, {
      enumerable: true,
      value: createSelector([get], res => res[key]),
    })

    Object.defineProperty(set, key, {
      enumerable: true,
      value: actionCreator(key as string, value => ({ value })),
    })

    Object.defineProperty(handlers, key, {
      enumerable: true,
      value: ((state, action) => ({
        ...state,
        [key]: action.payload.value,
      })) as Reducer<S>,
    })
  })

  return {
    get,
    set,
    reducer: actionHandler(handlers, initialState),
    name: namespace,
    toString: () => namespace,
  }
}
