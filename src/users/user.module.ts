import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MnemosyneService } from 'src/services/mnemosyne/mnemosyne.service'
import { UserResolver } from './user.resolver'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [MnemosyneService, UserResolver],
})
export class UserModule {}
