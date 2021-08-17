import { NotFoundException } from '@nestjs/common'
import { Args, Resolver, Query } from '@nestjs/graphql'
import { lastValueFrom } from 'rxjs'
import { MnemosyneService } from 'src/services/mnemosyne/mnemosyne.service'
import { User } from './models/user.model'

@Resolver(User)
export class UserResolver {
  constructor(private readonly mnemosyneService: MnemosyneService) {}

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await lastValueFrom(this.mnemosyneService.getUser(id))
    if (!user) {
      throw new NotFoundException(id)
    }

    return user
  }
}
