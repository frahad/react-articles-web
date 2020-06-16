import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { Layout, GlobalStyle } from './components'

const App = () => (
  <Provider store={store}>
    <GlobalStyle />

    <Layout />
  </Provider>
)

export default App
