import { Module } from '@nestjs/common'
import { SharedService } from 'src/shared.service'
import { DesignerController } from './designer.controller'
import { DesignerService } from './designer.service'

@Module({
  controllers: [DesignerController],
  providers: [DesignerService, SharedService],
})
export class DesignerModule {}
