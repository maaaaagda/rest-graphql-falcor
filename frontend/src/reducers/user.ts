import { createReducer } from 'typesafe-actions'
import { User } from 'MyModels'
import { setLoggedInUser } from 'src/actions'
import { combineReducers } from 'redux'

export default combineReducers({
  loggedInUser: createReducer(null as Nullable<User>).handleAction(
    setLoggedInUser,
    (_, action) => action.payload
  ),
})
