import * as bcrypt from 'bcrypt';
import {
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { OtpService } from './otp.service';
import { MailService } from './mail.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
    private otpService: OtpService,
  ) {}

  async register(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        verified: false,
      },
    });

    const otp = await this.otpService.generate(user.email);
    await this.mailService.sendVerificationOtp(user.email, otp);

    return { message: 'Account created. Verification email sent.' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.verified) throw new ForbiddenException('Email not verified');

    const tokens = this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    const safeUser = this.excludeSensitiveFields(user);
    return { user: safeUser, ...tokens };
  }

  getTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = this.jwtService.sign(payload, { secret: 'ACCESS_SECRET', expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { secret: 'REFRESH_SECRET', expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashed },
    });
  }


async refreshToken(dto: RefreshTokenDto) {
  const { refreshToken } = dto;

  try {
   
    const decoded: any = this.jwtService.decode(refreshToken);

    if (!decoded || !decoded.sub || !decoded.email) {
      throw new BadRequestException('Invalid token payload');
    }

    const userId = decoded.sub;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!tokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    const safeUser = this.excludeSensitiveFields(user);

    return { user: safeUser, ...tokens };
  } catch (error) {
    throw new UnauthorizedException('Invalid refresh token');
  }
}



  async verifyEmail(dto: VerifyOtpDto) {
    const valid = await this.otpService.verify(dto.email, dto.otp);
    if (!valid) throw new BadRequestException('Invalid OTP');

    await this.prisma.user.update({
      where: { email: dto.email },
      data: { verified: true },
    });

    return { message: 'Email verified' };
  }

  async initiatePasswordReset(email: string) {
    const otp = await this.otpService.generate(email);
    await this.mailService.sendPasswordResetOtp(email, otp);
    return { message: 'Password reset OTP sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.newPassword !== dto.confirmPassword)
      throw new BadRequestException('Passwords do not match');

    const valid = await this.otpService.verify(dto.email, dto.otp);
    if (!valid) throw new BadRequestException('Invalid OTP');

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({ where: { email: dto.email }, data: { password: hashed } });

    return { message: 'Password reset successful' };
  }

  private excludeSensitiveFields(user: any) {
    const { password, refreshToken, ...safeUser } = user;
    return safeUser;
  }
}
