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
import { IMnemosyneService, UserResponse } from './mnemosyne.interface'

const URL = 'localhost:6565'
const PACKAGE_NAME = 'mnemosyne'
console.log(process.env.MNEMOSYNE_HOST)

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

  private mnemosyneService: IMnemosyneService
  private metadata: Metadata = new Metadata()

  onModuleInit() {
    this.mnemosyneService =
      this.client.getService<IMnemosyneService>('Mnemosyne')
    this.metadata.add('authorization', 'Rpcksf2ZjnEphYR4iFevmzw1w87lGpXf')
  }

  getUser(id: string): Observable<UserResponse> {
    return this.mnemosyneService.getUser({ id }, this.metadata)
  }
}
