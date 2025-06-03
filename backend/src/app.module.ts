import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'default_secret',
			signOptions: { expiresIn: '1d' },
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT) || 5432,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			autoLoadEntities: true,
			entities: [__dirname + '/**/*.entity{.ts}'],
			migrations: ['src/migrations/*.ts'],
			synchronize: true,
			ssl:
				process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
			extra: {
				ssl:
					process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
			},
		}),
		ToolModule,
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
