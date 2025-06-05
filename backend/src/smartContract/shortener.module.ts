// src/shortener/shortener.module.ts
import { Module } from '@nestjs/common';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';
import { ShortIdGenerator } from './utils/short-id-generator';
import { StarknetAddressValidator } from './utils/starknet-address.validator';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
	providers: [
		ShortenerService,
		ShortIdGenerator,
		StarknetAddressValidator,
		PrismaService,
	],
	controllers: [ShortenerController],
	exports: [ShortenerService],
})
export class ShortenerModule {}
