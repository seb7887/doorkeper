import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './users/user.module'

const isDev = process.env.NODE_ENV === 'development'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !isDev,
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      debug: isDev,
      playground: isDev,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
