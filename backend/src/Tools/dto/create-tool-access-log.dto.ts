import { IsUUID } from 'class-validator';

export class CreateToolAccessLogDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  toolId: string;
}
