import { Permission } from "./User"

export interface LoginResponse {
  id: string
  email: string
  token: string
  name: string
  picture: string
  permissions: Permission[]
}