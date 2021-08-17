import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MnemosyneService } from 'src/services/mnemosyne/mnemosyne.service'
import { UserController } from './user.controller'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [MnemosyneService],
  controllers: [UserController],
})
export class UserModule {}
