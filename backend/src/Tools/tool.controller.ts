import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateToolDto } from '../Tools/dto/tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { JwtAuthGuard } from '../userAuth/guards/jwt-auth.guard';

@Controller('tools')
@UseGuards(JwtAuthGuard)
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

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
}
