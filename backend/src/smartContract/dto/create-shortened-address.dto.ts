import { IsString, IsOptional, MaxLength, IsDateString } from 'class-validator';

export class CreateShortenedAddressDto {
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
