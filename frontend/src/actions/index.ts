import { createAction } from 'typesafe-actions'
import { User } from 'MyModels'

export const setLoggedInUser = createAction('SET_LOGGED_IN_USER')<User>()
