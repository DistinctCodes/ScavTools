import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserProfileService } from './userAuth/user.profile.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from './userAuth/guards/jwt-auth.guard';
import { UserProfileController } from './userAuth/user.profile.controller';
import { AuthController } from './userAuth/auth.controller';
import { AuthService } from './userAuth/auth.service';
import { MailService } from './userAuth/mail.service';
import { OtpService } from './userAuth/otp.service';
import { ToolModule } from './Tools/tool.module';
import { PdfModule } from './pdf/pdf.module';
import { ShortenerModule } from './smartContract/shortener.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'default_secret',
			signOptions: { expiresIn: '1d' },
		}),
		PdfModule,
		ToolModule,
		ShortenerModule,
	],
	controllers: [UserProfileController, AuthController],
	providers: [
		MailService,
		UserProfileService,
		PrismaService,
		OtpService,
		JwtAuthGuard,
		AuthService,
	],
})
export class AppModule {}
