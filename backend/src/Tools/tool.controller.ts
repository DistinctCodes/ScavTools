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
import { CreateToolDto } from '../Tools/dto/tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { JwtAuthGuard } from '../userAuth/guards/jwt-auth.guard';
import { FilterToolsDto } from '../Tools/dto/filter-tools.dto';
import { ToolAccessLogService } from '../Tools/tool-access-log.service'

@Controller('tools')
@UseGuards(JwtAuthGuard)
export class ToolController {
  constructor(
    private readonly toolService: ToolService,
    private readonly toolAccessLogService: ToolAccessLogService,
  ) {}

  @Post()
  create(@Body() dto: CreateToolDto) {
    return this.toolService.createTool(dto);
  }

  @Get()
  getAll() {
    return this.toolService.getAllTools();
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

   @Get()
  findFiltered(@Query() filterDto: FilterToolsDto) {
    return this.toolService.findAllFiltered(filterDto);
  }

  @Get(':id')
@UseGuards(JwtAuthGuard)
async getTool(
  @Param('id') id: string,
  @Req() req: any,
): Promise<CreateToolDto> {
 const tool = await this.toolService.findOne(id)
const user = req.user;

await this.toolAccessLogService.logAccess(user, tool);

return tool;

}

}

