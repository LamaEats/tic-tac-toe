import { ActionCreator, Selector, PayloadCreator, Module, Getters, Actions, Handlers, Reducer } from './typings'

export function createSelector<S, R, T>(selectors: (Selector<S, R>)[], resultFn: (...res: R[]) => T) {
  const selector = (state: S, ...rest: any[]) => {
    const params = []

    for (let i = 0; i < selectors.length; i += 1) {
      params.push(selectors[i](state, ...rest))
    }

    return resultFn(...params)
  }

  selector.resultFn = resultFn

  return selector
}

const getActionCreator = <N, S>(namespace: N) => (type: keyof S, actionFn: PayloadCreator<S[keyof S]>) => {
  const action: ActionCreator<S[keyof S]> = arg => ({
    type: `${namespace}/${type}`,
    payload: actionFn(arg),
  })

  action.toString = () => type as string

  return action
}


const getActionHandler = <S, N extends string>(namespace: N) => <M>(actionHandlersMap: M, defaultState: S): Reducer<S> => {
  const keys = Object.keys(actionHandlersMap) as (keyof M)[]
  const handlers = {} as Handlers<S>

  keys.forEach(key => {
    const action = actionHandlersMap[key]
    Object.defineProperty(handlers, `${namespace}/${key}`, {
      enumerable: true,
      value: action
    })
  })

  return (state, action) => {
    const currentState = state || defaultState
    const handler = handlers[action.type]
    return typeof handler === 'function' ? handler(currentState, action) : currentState
  }
}

export const createModule = <S, N extends string>(namespace: N, initialState: S): Module<S, N> => {
  const stateKeys = Object.keys(initialState) as (keyof S)[]
  const actionCreator = getActionCreator<N, S>(namespace)
  const handleCreator = getActionHandler<S, N>(namespace)

  const get = {
    module: (state) => state[namespace]
  } as Getters<S, N>

  const set = {} as Actions<S>
  const handlers = {} as Handlers<S>

  stateKeys.forEach(key => {
    Object.defineProperty(get, key, {
      enumerable: true,
      value: createSelector([get.module], res => res[key])
    })

    Object.defineProperty(set, key, {
      enumerable: true,
      value: actionCreator(key, (value) => ({ value }))
    })

    const callback: Reducer<S> = (state, action) => ({
      ...state,
      [key]: action.payload.value
    })

    Object.defineProperty(handlers, set[key].toString(), {
      enumerable: true,
      value: callback
    })
  })

  return {
    get,
    set,
    reducer: handleCreator(handlers, initialState),
    name: namespace,
    toString: () => namespace
  }
}
