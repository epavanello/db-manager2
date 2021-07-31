import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerModule } from './manager/manager.module';
import { DesignerModule } from './designer/designer.module';

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
