import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { ResolveAddressResponseDto } from './dto/shorten-address.dto';
import { ShortIdGenerator } from './utils/short-id-generator';
import { PrismaService } from '../../prisma/prisma.service';
import { StarknetAddressValidator } from './utils/starknet-address.validator';

@Injectable()
export class ShortenerService {
	private readonly MAX_RETRIES = 3;

	constructor(
		private prisma: PrismaService,
		private idGenerator: ShortIdGenerator,
		private addressValidator: StarknetAddressValidator
	) {}

	async shortenAddress(userId: string, address: string): Promise<string> {
		// StarkNet-specific validation
		if (!this.addressValidator.validate(address)) {
			throw new Error('Invalid StarkNet contract address');
		}

		// Check if address already exists for this user
		const existingAddress = await this.prisma.shortenedAddress.findFirst({
			where: {
				originalAddress: address,
				userId: userId,
			},
		});

		if (existingAddress) {
			return existingAddress.shortId;
		}

		let retries = 0;
		let shortId: string;
		let existingEntry;

		// Collision-resistant generation with retries
		do {
			shortId =
				retries > 0
					? this.idGenerator.generate() + retries.toString()
					: this.idGenerator.generate();

			existingEntry = await this.prisma.shortenedAddress.findUnique({
				where: { shortId },
			});

			retries++;
		} while (existingEntry && retries < this.MAX_RETRIES);

		if (existingEntry) {
			throw new ConflictException('Unable to generate unique short ID');
		}

		const created = await this.prisma.shortenedAddress.create({
			data: {
				shortId,
				originalAddress: address,
				userId,
			},
		});

		return created.shortId;
	}

	async resolveAddress(shortId: string): Promise<ResolveAddressResponseDto> {
		const entry = await this.prisma.shortenedAddress.findUnique({
			where: { shortId },
		});

		if (!entry) {
			throw new NotFoundException('Short ID not found');
		}

		// Check if expired
		if (entry.expiresAt && entry.expiresAt < new Date()) {
			throw new NotFoundException('Short ID has expired');
		}

		return {
			originalAddress: entry.originalAddress,
			shortId: entry.shortId,
		};
	}

	async getUserAddresses(userId: string) {
		return this.prisma.shortenedAddress.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});
	}

	async deleteAddress(shortId: string, userId: string): Promise<void> {
		const entry = await this.prisma.shortenedAddress.findUnique({
			where: { shortId },
		});

		if (!entry) {
			throw new NotFoundException('Short ID not found');
		}

		if (entry.userId !== userId) {
			throw new ConflictException('You can only delete your own addresses');
		}

		await this.prisma.shortenedAddress.delete({
			where: { shortId },
		});
	}
}
