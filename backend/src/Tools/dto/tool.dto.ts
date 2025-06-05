import { IsEnum, IsOptional, IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { ToolType } from './filter-tools.dto';

export class CreateToolDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsEnum(ToolType)
  type: ToolType;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsString()
  iconUrl?: string;
}