export type UserRole = "user" | "admin" | "dietician"

export type User = {
  id: string
  email: string
  role: UserRole
}
