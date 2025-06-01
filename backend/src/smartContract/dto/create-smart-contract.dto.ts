import { IsString, IsUUID, IsOptional, MaxLength, IsDateString } from 'class-validator';

export class CreateSmartContractDto {
  @IsString()
  @MaxLength(255)
  originalAddress: string;

  @IsString()
  @MaxLength(50)
  shortId: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;  
}
