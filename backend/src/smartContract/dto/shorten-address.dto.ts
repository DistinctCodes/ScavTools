// src/dto/shorten-address.dto.ts
import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class ShortenAddressDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;
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
