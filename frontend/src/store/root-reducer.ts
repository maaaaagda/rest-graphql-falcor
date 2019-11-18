import { combineReducers } from 'redux'
import * as reducers from 'src/reducers'

export default combineReducers({
  user: reducers.userReducer,
})
