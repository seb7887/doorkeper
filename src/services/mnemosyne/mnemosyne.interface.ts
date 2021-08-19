import { Metadata } from '@grpc/grpc-js'
import { Observable } from 'rxjs'
import { LoginDto, NewUserDto, UserRole } from './dto'

export interface UserResponse {
  id: string
  username: string
  email: string
  picture: string
  role: UserRole
  currentWorkspace: string
  currentGrid: string
  lastLogin: string
  updatedAt: string
}

export interface UsersResponse {
  users: UserResponse[]
  total: number
}

interface IdDto {
  id: string
}

export interface MnemosyneGrpcService {
  signUp(dto: NewUserDto, metadata?: Metadata): Observable<UserResponse>
  login(dto: LoginDto, metadata?: Metadata): Observable<UserResponse>
  getUser(dto: IdDto, metadata?: Metadata): Observable<UserResponse>
}
