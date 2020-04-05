export const createSelector = (state, ...stateGetters) => stateGetters.reduce(
  (partialState, stateGetter) => {
    if (typeof stateGetter !== 'function' || partialState == null) return partialState

    const nextPartialState = stateGetter(partialState)

    if (nextPartialState == null) return null

    return nextPartialState
  }, state)

const getActionCreator = namespace => (type, actionFn) => {
  const action = (...args) => ({
    type: `${namespace}/${type}`,
    payload: actionFn(...args),
  })

  action.toString = () => type

  return action
}

const getActionHandler = namespace => (actionHandlersMap, defaultState) => {
  const actionKeys = Object.keys(actionHandlersMap)

  const handlers = actionKeys.reduce((acc, actionName) => {
    acc[`${namespace}/${actionName}`] = actionHandlersMap[actionName]
    return acc
  }, {})

  return (state, action) => {
    const currentState = state || defaultState
    const handler = handlers[action.type]
    return typeof handler === 'function' ? handler(currentState, action) : currentState
  }
}

export const createModule = (namespace, initialState) => {
  const stateKeys = Object.keys(initialState)
  const actionCreator = getActionCreator(namespace)
  const handleActions = getActionHandler(namespace)

  const resetState = actionCreator('RESET', () => undefined)

  const set = stateKeys.reduce((acc, actionType) => {
    acc[actionType] = actionCreator(actionType, (value) => value)
    return acc
  }, {
    resetState
  })

  const get = state => createSelector(state, partialState => partialState[namespace])

  for (let i = 0; i < stateKeys.length; i += 1) {
    const key = stateKeys[i]
    Object.defineProperty(get, key, {
      enumerable: true,
      value: state => {
        const stateData = createSelector(state, get, partialState => partialState[key])

        return stateData != null ? stateData : initialState[key]
      },
    })
  }

  const handler = stateKeys.reduce((acc, actionType) => {
    acc[set[actionType]] = (state, {
      payload: value
    }) => ({
      ...state,
      [actionType]: value
    })
    return acc
  }, {
    [resetState]: () => initialState,
  })

  return {
    get,
    set,
    reducer: handleActions(handler, initialState),
    name: namespace,
    toString: () => namespace
  }
}
