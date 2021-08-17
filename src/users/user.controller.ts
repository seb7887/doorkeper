import { Controller, Get } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'
import { MnemosyneService } from '../services/mnemosyne/mnemosyne.service'

@Controller('users')
export class UserController {
  constructor(private readonly mnemosyneService: MnemosyneService) {}

  @Get()
  async getUser(): Promise<any> {
    const user = await lastValueFrom(
      this.mnemosyneService.getUser('d0d5b9d6-9dfb-4733-b478-df01999f33a5'),
    )

    return user
  }
}
