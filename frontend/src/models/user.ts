import { UserRole } from '../../../backend/src/api/user/model/UserRole'

export type User = {
  id: string
  email: string
  role: UserRole
  token?: string
}
