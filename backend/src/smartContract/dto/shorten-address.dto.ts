import { IsNotEmpty } from 'class-validator';
import { StarknetAddressValidator } from '../utils/starknet-address.validator';

export class ShortenAddressDto {
	@IsNotEmpty()
	address: string;

	async isValid(): Promise<boolean> {
		const validator = new StarknetAddressValidator();
		return validator.validate(this.address);
	}
}

export class ShortenAddressResponseDto {
	shortId: string;
	originalAddress: string;
	createdAt: Date;
}

export class ResolveAddressResponseDto {
	originalAddress: string;
	shortId: string;
}
