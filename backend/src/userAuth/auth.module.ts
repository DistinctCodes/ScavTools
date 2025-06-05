import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MailService } from './mail.service';
import { OtpService } from './otp.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'ACCESS_SECRET',
			signOptions: { expiresIn: '15m' },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
		MailService,
		OtpService,
		PrismaService,
		JwtAuthGuard,
	],
	exports: [AuthService, JwtAuthGuard, PassportModule],
})
export class AuthModule {}
