import React from 'react'
import { Provider } from 'react-redux'
import { Board } from './feature'
import { configureStore } from './store'

const store = configureStore()

export const App = () => (
  <Provider store={store}>
    <Board />
  </Provider>
)
