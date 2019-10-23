import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'

import { loginAsync } from '../actions/auth'

type UserData = {
  id: string
  email: string
}
export const data = createReducer<UserData | null>(null).handleAction(
  loginAsync.success,
  (state, action) => ({ ...action.payload })
)

const userReducer = combineReducers({
  data,
})

export default userReducer
export type AuthState = ReturnType<typeof userReducer>
