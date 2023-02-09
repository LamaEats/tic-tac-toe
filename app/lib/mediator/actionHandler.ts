import { Reducer, Handlers } from './typings'

export function actionHandler<S>(actionHandlersMap: Handlers<S>, defaultState: S): Reducer<S> {
  return (state, action) => {
    const currentState = state || defaultState
    const handler = actionHandlersMap[action.type as keyof Handlers<S>]

    return typeof handler === 'function' ? handler(currentState, action) : currentState
  }
}

export function namespacedActionHandler<N>(namespace: N) {
  return <S>(map: Handlers<S>, state: S) => {
    const nextMap = {} as Handlers<S>

    // eslint-disable-next-line guard-for-in
    for (const key in map) {
      const namespacedKey = `${namespace}/${key}`
      const action = map[key as keyof Handlers<S>]

      Object.defineProperty(nextMap, namespacedKey, {
        enumerable: true,
        value: action,
      })
    }

    return actionHandler(nextMap, state)
  }
}
