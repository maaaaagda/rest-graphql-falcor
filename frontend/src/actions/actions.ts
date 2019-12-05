import { User } from 'src/models'
import { SetLoggedInUser } from './types'
import * as constants from './constants'

export const setLoggedInUser = (user: Nullable<User>): SetLoggedInUser => ({
  type: constants.SET_LOGGED_IN_USER,
  payload: user,
})
