import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsEmail, IsNotEmpty } from 'class-validator'

@InputType()
export class NewUserInput {
  @Field()
  username: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  password: string

  @Field()
  @IsNotEmpty()
  role: 'admin' | 'operator'

  @Field({ nullable: true })
  @IsOptional()
  workspaceId?: string
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  password: string
}
