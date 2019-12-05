export type UserRole = "user" | "admin" | "dietitian"

export type User = {
  id: string
  email: string
  role: UserRole
  token?: string
}
