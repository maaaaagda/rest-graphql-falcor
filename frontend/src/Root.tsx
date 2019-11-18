// App.js - react-hot-loader >= 4.5.4
import React from 'react'
import { Provider } from 'react-redux'
import { RestfulProvider } from 'restful-react'
import App from './App'
import { hot } from 'react-hot-loader/root'
import store from './store'
import { BrowserRouter } from 'react-router-dom'

const Root = () => (
  <Provider store={store}>
    <RestfulProvider base={process.env.REACT_APP_API_ENDPOINT as string}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RestfulProvider>
  </Provider>
)

export default process.env.NODE_ENV === 'development' ? hot(Root) : Root
