import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  username: string

  @Field()
  email: string

  @Field({ nullable: true })
  picture?: string

  @Field()
  role: string

  @Field({ nullable: true })
  currentGrid?: string

  @Field({ nullable: true })
  currentWorkspace?: string

  @Field()
  lastLogin: string

  @Field()
  updatedAt: string
}
