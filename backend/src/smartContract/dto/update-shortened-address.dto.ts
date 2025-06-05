import { PartialType } from '@nestjs/mapped-types';
import { CreateShortenedAddressDto } from './create-shortened-address.dto';

export class UpdateShortenedAddressDto extends PartialType(
	CreateShortenedAddressDto
) {}
