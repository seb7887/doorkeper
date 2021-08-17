import { Metadata } from '@grpc/grpc-js'
import { Observable } from 'rxjs'

export interface UserResponse {
  id: string
  username: string
  email: string
  picture: string
  role: string
  currentWorkspace: string
  currentGrid: string
  lastLogin: string
  updatedAt: string
}

export interface UsersResponse {
  users: UserResponse[]
  total: number
}

interface Id {
  id: string
}

export interface IMnemosyneService {
  getUser(id: Id, metadata?: Metadata): Observable<UserResponse>
}
