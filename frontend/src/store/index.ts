import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'src/middleware'
import rootReducer from './root-reducer'

let middleware = applyMiddleware(logger)

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(middleware)
}

export default createStore(rootReducer, {}, middleware)
