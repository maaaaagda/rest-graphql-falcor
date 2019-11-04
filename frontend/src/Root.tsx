// App.js - react-hot-loader >= 4.5.4
import React from 'react'
import { RestfulProvider } from 'restful-react'
import App from './App'
import { hot } from 'react-hot-loader/root'

const Root = () => (
  <RestfulProvider base={process.env.REACT_APP_API_ENDPOINT as string}>
    <App />
  </RestfulProvider>
)

export default process.env.NODE_ENV === 'development' ? hot(Root) : Root
