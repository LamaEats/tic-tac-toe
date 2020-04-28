import React from 'react'
import { Provider } from 'react-redux'
import { Board } from './feature'
import { configureStore } from './store'
import { KeybordControl } from './feature/KeyboardContol/KeybordControl'

const store = configureStore()

export const App = () => (
  <Provider store={store}>
    <KeybordControl>
      <Board />
    </KeybordControl>
  </Provider>
)
