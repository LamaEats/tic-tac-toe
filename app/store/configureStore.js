import {
  createStore,
  compose as reduxCompose,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import * as modules from './store'

export const configureStore = (preloadState = {}) => {
  let compose = reduxCompose
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    // eslint-disable-next-line no-underscore-dangle
    compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }

  const mws = [thunk]

  const enhancers = compose(
    applyMiddleware(...mws)
  )

  const redusers = Object.keys(modules).reduce((acc, moduleName) => {
    const module = modules[moduleName]

    acc[module] = module.reducer
    return acc
  }, {})

  return createStore(combineReducers(redusers), preloadState, enhancers)
}
