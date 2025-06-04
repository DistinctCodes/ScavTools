import { Module } from '@nestjs/common';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import { ToolAccessLogService } from './tool-access-log.service';
import { PrismaService } from './../../prisma/prisma.service';

@Module({
	controllers: [ToolController],
	providers: [ToolService, ToolAccessLogService, PrismaService],
	exports: [ToolService, ToolAccessLogService],
})
export class ToolModule {}
