import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthenticationError } from 'apollo-server-express'
import { Observable } from 'rxjs'
import { verifyAndDecodeToken } from '../utils'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context)
      const { req } = ctx.getContext()

      const authHeader = req.headers['authorization']
      if (!authHeader) {
        return false
      }

      const token = verifyAndDecodeToken(authHeader)
      if (!token) {
        return false
      }

      return true
    } catch (err) {
      throw new AuthenticationError(err.message)
    }
  }
}
