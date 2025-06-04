import {
	Controller,
	Post,
	Get,
	Param,
	Body,
	Patch,
	Delete,
	UseGuards,
	Query,
	Req,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateToolDto } from './dto/tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { JwtAuthGuard } from '../userAuth/guards/jwt-auth.guard';
import { FilterToolsDto } from './dto/filter-tools.dto';
import { ToolAccessLogService } from './tool-access-log.service';
import { Tool } from '@prisma/client';

@Controller('tools')
@UseGuards(JwtAuthGuard)
export class ToolController {
	constructor(
		private readonly toolService: ToolService,
		private readonly toolAccessLogService: ToolAccessLogService
	) {}

	@Post()
	create(@Body() dto: CreateToolDto) {
		return this.toolService.createTool(dto);
	}

	@Get()
	getAll() {
		return this.toolService.getAllTools();
	}

	@Get('filtered')
	findFiltered(@Query() filterDto: FilterToolsDto) {
		return this.toolService.findAllFiltered(filterDto);
	}

	@Get(':slug')
	getBySlug(@Param('slug') slug: string) {
		return this.toolService.getToolBySlug(slug);
	}

	@Patch(':slug')
	update(@Param('slug') slug: string, @Body() dto: UpdateToolDto) {
		return this.toolService.updateTool(slug, dto);
	}

	@Delete(':slug')
	delete(@Param('slug') slug: string) {
		return this.toolService.deleteTool(slug);
	}

	@Get('access/:id')
	@UseGuards(JwtAuthGuard)
	async getTool(@Param('id') id: string, @Req() req: any): Promise<Tool> {
		const tool = await this.toolService.findOne(id);
		const user = req.user;

		await this.toolAccessLogService.logAccess(user, tool);

		return tool;
	}
}
