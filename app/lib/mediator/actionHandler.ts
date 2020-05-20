import { Reducer, Handlers } from './typings'

export function actionHandler <S>(actionHandlersMap: Omit<Handlers<S>, 'reset'>, defaultState: S): Reducer<S> {
  return (state, action) => {
    const currentState = state || defaultState
    const handler = actionHandlersMap[action.type]

    return typeof handler === 'function' ? handler(currentState, action) : currentState
  }
}

export function namespacedActionHandler <N>(namespace: N) {
  return <S>(map: Handlers<S>, state: S) => {
    const nextMap = {}
    const keys = Object.keys(map)

    keys.forEach(key => {
      const namespacedKey = `${namespace}/${key}`
      const action = map[key]
      Object.defineProperty(nextMap, namespacedKey, {
        enumerable: true,
        value: action
      })
    })

    return actionHandler(nextMap, state)
  }
}
