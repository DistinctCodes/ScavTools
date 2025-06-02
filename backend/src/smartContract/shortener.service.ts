import { Injectable, NotFoundException } from '@nestjs/common';
import { ShortenAddressDto, ShortenAddressResponseDto, ResolveAddressResponseDto } from './dto/shorten-address.dto';
import { generateShortId } from './utils/short-id-generator';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ShortenerService {
  constructor(private prisma: PrismaService) {}

  async shortenAddress(userId: string, dto: ShortenAddressDto): Promise<ShortenAddressResponseDto> {
    const existing = await this.prisma.shortenedAddress.findFirst({
      where: {
        userId,
        originalAddress: dto.address,
      },
    });

    if (existing) {
      return {
        shortId: existing.shortId,
        originalAddress: existing.originalAddress,
        createdAt: existing.createdAt,
      };
    }

    const shortId = generateShortId();
    const newEntry = await this.prisma.shortenedAddress.create({
      data: {
        shortId,
        originalAddress: dto.address,
        userId,
      },
    });

    return {
      shortId: newEntry.shortId,
      originalAddress: newEntry.originalAddress,
      createdAt: newEntry.createdAt,
    };
  }

  async resolveAddress(shortId: string): Promise<ResolveAddressResponseDto> {
    const entry = await this.prisma.shortenedAddress.findUnique({
      where: { shortId },
    });

    if (!entry) {
      throw new NotFoundException('Short ID not found');
    }

    return {
      originalAddress: entry.originalAddress,
      shortId: entry.shortId,
    };
  }
}