import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ToolType } from '../entities/tool.entity';

export class FilterToolsDto {
  @IsEnum(ToolType)
  @IsOptional()
  type?: ToolType;

  @IsString()
  @IsOptional()
  tags?: string;
}
