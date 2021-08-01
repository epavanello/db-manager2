import { Module } from '@nestjs/common'
import { SharedService } from 'src/shared.service'
import { ManagerController } from './manager.controller'
import { ManagerService } from './manager.service'

@Module({
  controllers: [ManagerController],
  providers: [ManagerService, SharedService],
})
export class ManagerModule {}
