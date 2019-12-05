import * as constants from './constants'
import { User } from 'src/models'

export type SetLoggedInUser = {
  type: constants.SET_LOGGED_IN_USER
  payload: Nullable<User>
}

export type ActionType = SetLoggedInUser
