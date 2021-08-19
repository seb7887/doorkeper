import 'dotenv/config'
import {
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common'
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql'
import { sign } from 'jsonwebtoken'
import { lastValueFrom } from 'rxjs'
import { MnemosyneService } from 'src/services/mnemosyne/mnemosyne.service'
import { NewUserInput, LoginInput } from './inputs/user.inputs'
import { AuthResponse, UserResponse } from './interfaces/user.interface'
import { User } from './models/user.model'
import { AuthGuard } from 'src/guards/auth'

@Resolver(User)
export class UserResolver {
  constructor(private readonly mnemosyneService: MnemosyneService) {}

  @Mutation(returns => AuthResponse)
  async signUp(
    @Args('user')
    { username, email, password, role, workspaceId }: NewUserInput,
  ): Promise<AuthResponse> {
    try {
      const user = await lastValueFrom(
        this.mnemosyneService.signUp({
          username,
          email,
          password,
          role,
          workspaceId,
        }),
      )

      const token = this.generateJWT(user.id, user.email, user.role)

      return {
        user,
        token,
      }
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  @Mutation(returns => AuthResponse)
  async login(
    @Args('credentials') { email, password }: LoginInput,
  ): Promise<AuthResponse> {
    try {
      const user = await lastValueFrom(
        this.mnemosyneService.login({ email, password }),
      )

      const token = this.generateJWT(user.id, user.email, user.role)

      return {
        user,
        token,
      }
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  @Query(returns => UserResponse)
  @UseGuards(AuthGuard)
  async user(@Args('id') id: string): Promise<UserResponse> {
    try {
      const user = await lastValueFrom(this.mnemosyneService.getUser(id))

      return { user }
    } catch (err) {
      throw new NotFoundException(id)
    }
  }

  generateJWT(id: string, email: string, role: string) {
    return sign({ id, email, role }, process.env.JWT_SECRET || '')
  }
}
