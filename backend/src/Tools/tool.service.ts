import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Tool, Prisma } from '@prisma/client';
import { CreateToolDto } from './dto/tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { FilterToolsDto, ToolType } from './dto/filter-tools.dto';

@Injectable()
export class ToolService {
	constructor(private prisma: PrismaService) {}

	async createTool(dto: CreateToolDto): Promise<Tool> {
		return this.prisma.tool.create({
			data: dto,
		});
	}

	async getAllTools(): Promise<Tool[]> {
		return this.prisma.tool.findMany();
	}

	async getToolBySlug(slug: string): Promise<Tool> {
		const tool = await this.prisma.tool.findUnique({
			where: { slug },
		});
		if (!tool) throw new NotFoundException('Tool not found');
		return tool;
	}

	async updateTool(slug: string, dto: UpdateToolDto): Promise<Tool> {
		try {
			return await this.prisma.tool.update({
				where: { slug },
				data: dto,
			});
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === 'P2025'
			) {
				throw new NotFoundException('Tool not found');
			}
			throw error;
		}
	}

	async deleteTool(slug: string): Promise<void> {
		try {
			await this.prisma.tool.delete({
				where: { slug },
			});
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === 'P2025'
			) {
				throw new NotFoundException('Tool not found');
			}
			throw error;
		}
	}

	async findAllFiltered(filter: FilterToolsDto): Promise<Tool[]> {
		const { type, tags } = filter;

		const where: Prisma.ToolWhereInput = {};

		if (type) {
			where.type = type;
		}

		if (tags) {
			const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());
			where.tags = {
				hasSome: tagsArray,
			};
		}

		return this.prisma.tool.findMany({
			where,
		});
	}

	async findOne(id: string): Promise<Tool> {
		const tool = await this.prisma.tool.findUnique({
			where: { id },
		});
		if (!tool) throw new NotFoundException('Tool not found');
		return tool;
	}
}
