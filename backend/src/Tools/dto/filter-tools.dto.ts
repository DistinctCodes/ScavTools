import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum ToolType {
	FRONTEND = 'FRONTEND',
	BACKEND = 'BACKEND',
	WEB3 = 'WEB3',
}

export class FilterToolsDto {
	@IsEnum(ToolType)
	@IsOptional()
	type?: ToolType;

	@IsString()
	@IsOptional()
	tags?: string;
}
