import { UserRole } from './user-role'

export interface NewUserDto {
  username: string
  email: string
  password: string
  role: UserRole
  workspaceId?: string
}
