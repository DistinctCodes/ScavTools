// src/shortener/shortener.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenAddressDto, ShortenAddressResponseDto, ResolveAddressResponseDto } from './dto/shorten-address.dto';
import { JwtAuthGuard } from '../userAuth/guards/jwt-auth.guard';
import { GetUser } from '../userAuth/guards/user.decorator';

interface User {
  id: string;
}

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @UseGuards(JwtAuthGuard)
  @Post('shorten')
  async shorten(
    @GetUser() user: User,
    @Body() dto: ShortenAddressDto,
  ): Promise<ShortenAddressResponseDto> {
    return this.shortenerService.shortenAddress(user.id, dto);
  }

  @Get('resolve/:shortId')
  async resolve(
    @Param('shortId') shortId: string,
  ): Promise<ResolveAddressResponseDto> {
    return this.shortenerService.resolveAddress(shortId);
  }
}