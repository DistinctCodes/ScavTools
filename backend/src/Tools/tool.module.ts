import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from './entities/tool.entity';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import { ToolAccessLog } from '../Tools/entities/tool-access-log.entity';
import { ToolAccessLogService } from '../Tools/tool-access-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tool, ToolAccessLog]),
  ],
  controllers: [ToolController],
  providers: [ToolService, ToolAccessLogService],
})
export class ToolModule {}
