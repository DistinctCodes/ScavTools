import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MailService } from './mail.service';
import { OtpService } from './otp.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
	imports: [
		JwtModule.register({
			secret: 'ACCESS_SECRET',
			signOptions: { expiresIn: '15m' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, MailService, OtpService, PrismaService],
	exports: [AuthService],
})
export class AuthModule {}
