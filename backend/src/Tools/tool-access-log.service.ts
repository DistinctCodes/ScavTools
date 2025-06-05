import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { User, Tool, ToolAccessLog } from '@prisma/client';

@Injectable()
export class ToolAccessLogService {
	constructor(private prisma: PrismaService) {}

	async logAccess(user: User, tool: Tool): Promise<ToolAccessLog> {
		return this.prisma.toolAccessLog.create({
			data: {
				userId: user.id,
				toolId: tool.id,
			},
			include: {
				user: true,
				tool: true,
			},
		});
	}
}
