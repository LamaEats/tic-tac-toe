import {
  createStore,
  compose as reduxCompose,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import {
  gameModule
} from './store'

export const configureStore = (preloadState = {}) => {
  let compose = reduxCompose
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    // eslint-disable-next-line no-underscore-dangle
    compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }

  const mws = [thunk]

  const enhancers = compose(
    applyMiddleware(...mws)
  )

  return createStore(combineReducers({
    [gameModule]: gameModule.reducer
  }), preloadState, enhancers)
}
