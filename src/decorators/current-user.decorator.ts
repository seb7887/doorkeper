import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { verifyAndDecodeToken } from 'src/utils'

export const CurrentUser = createParamDecorator((data, context) => {
  const ctx = GqlExecutionContext.create(context)
  const { req } = ctx.getContext()
  const authHeader = req.headers['authorization']

  const { id } = verifyAndDecodeToken(authHeader)

  return id
})
