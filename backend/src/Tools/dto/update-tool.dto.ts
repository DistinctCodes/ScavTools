import { PartialType } from '@nestjs/mapped-types';
import { CreateToolDto } from './tool.dto';

export class UpdateToolDto extends PartialType(CreateToolDto) {}
