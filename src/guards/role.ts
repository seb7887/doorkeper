import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthenticationError } from 'apollo-server-express'
import { verifyAndDecodeToken } from '../utils'

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
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

      return token.role === 'admin'
    } catch (err) {
      throw new AuthenticationError(err.message)
    }
  }
}
