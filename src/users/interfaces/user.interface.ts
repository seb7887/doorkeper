import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'
import { User } from '../models/user.model'

@InterfaceType()
export abstract class UserBaseResponse {
  @Field(() => User)
  user: User
}

@ObjectType({ implements: UserBaseResponse })
export class AuthResponse implements UserBaseResponse {
  user: User

  @Field()
  token: string
}

@ObjectType({ implements: UserBaseResponse })
export class UserResponse implements UserBaseResponse {
  user: User
}
