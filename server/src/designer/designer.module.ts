import { Module } from '@nestjs/common';
import { DesignerController } from './designer.controller';
import { DesignerService } from './designer.service';

@Module({
  controllers: [DesignerController],
  providers: [DesignerService]
})
export class DesignerModule {}
