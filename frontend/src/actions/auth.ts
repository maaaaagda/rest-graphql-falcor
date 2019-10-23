import { createStandardAction, createAsyncAction } from 'typesafe-actions'

export const loginAsync = createAsyncAction(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE'
)<undefined, undefined, undefined>()
