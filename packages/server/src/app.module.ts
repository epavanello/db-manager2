import { Module } from '@nestjs/common'
import { KnexModule } from 'nestjs-knex'
import { AppService } from './app.service'
import { ManagerModule } from './manager/manager.module'
import { DesignerModule } from './designer/designer.module'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'dist'),
    }),
    KnexModule.forRoot({
      config: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
          filename: './dev.sqlite3',
        },
      },
    }),
    ManagerModule,
    DesignerModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
