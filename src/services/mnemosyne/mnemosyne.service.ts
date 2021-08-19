import 'dotenv/config'
import { Metadata } from '@grpc/grpc-js'
import { Injectable, OnModuleInit } from '@nestjs/common'
import {
  Client,
  ClientGrpc,
  ClientOptions,
  Transport,
} from '@nestjs/microservices'
import { join } from 'path'
import { Observable } from 'rxjs'
import { MnemosyneGrpcService, UserResponse } from './mnemosyne.interface'
import { LoginDto, NewUserDto } from './dto'

const URL = `${process.env.MNEMOSYNE_HOST}:${process.env.MNEMOSYNE_PORT}`
const PACKAGE_NAME = 'mnemosyne'

export const MnemosyneServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: URL,
    package: PACKAGE_NAME,
    protoPath: join(__dirname, '../../proto/mnemosyne.proto'),
  },
}

@Injectable()
export class MnemosyneService implements OnModuleInit {
  @Client(MnemosyneServiceOptions)
  client: ClientGrpc

  private mnemosyneService: MnemosyneGrpcService
  private metadata: Metadata = new Metadata()

  onModuleInit() {
    this.mnemosyneService =
      this.client.getService<MnemosyneGrpcService>('Mnemosyne')
    this.metadata.add('authorization', process.env.MNEMOSYNE_KEY)
  }

  signUp(dto: NewUserDto): Observable<UserResponse> {
    return this.mnemosyneService.signUp(dto, this.metadata)
  }

  login(dto: LoginDto): Observable<UserResponse> {
    return this.mnemosyneService.login(dto, this.metadata)
  }

  getUser(id: string): Observable<UserResponse> {
    return this.mnemosyneService.getUser({ id }, this.metadata)
  }
}
