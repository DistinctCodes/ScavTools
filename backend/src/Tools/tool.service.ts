import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from './entities/tool.entity';
import { CreateToolDto } from '../Tools/dto/tool.dto';
import { UpdateToolDto } from '../Tools/dto/update-tool.dto';

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(Tool)
    private toolRepository: Repository<Tool>,
  ) {}

  async createTool(dto: CreateToolDto): Promise<Tool> {
    const tool = this.toolRepository.create(dto);
    return this.toolRepository.save(tool);
  }

  async getAllTools(): Promise<Tool[]> {
    return this.toolRepository.find();
  }

  async getToolBySlug(slug: string): Promise<Tool> {
    const tool = await this.toolRepository.findOne({ where: { slug } });
    if (!tool) throw new NotFoundException('Tool not found');
    return tool;
  }

  async updateTool(slug: string, dto: UpdateToolDto): Promise<Tool> {
    const tool = await this.getToolBySlug(slug);
    Object.assign(tool, dto);
    return this.toolRepository.save(tool);
  }

  async deleteTool(slug: string): Promise<void> {
    const result = await this.toolRepository.delete({ slug });
    if (result.affected === 0) throw new NotFoundException('Tool not found');
  }
}
