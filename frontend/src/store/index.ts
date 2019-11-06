import { Store, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'src/middleware'
import { rootReducer } from 'src/reducers'

export function configureStore(initialState?: any): Store<{}> {
  let middleware = applyMiddleware(logger)

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware)
  }

  return createStore(rootReducer, initialState, middleware) as Store<{}>
}
