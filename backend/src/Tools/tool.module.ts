import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from './entities/tool.entity';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tool])],
  providers: [ToolService],
  controllers: [ToolController],
})
export class ToolModule {}
