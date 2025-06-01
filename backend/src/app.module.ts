import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './userAuth/entities/user.entity';
import { UserProfileService } from './userAuth/user.profile.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from './userAuth/guards/jwt-auth.guard';
import { UserProfileController } from './userAuth/user.profile.controller';
import { AuthController } from './userAuth/auth.controller';
import { AuthService } from './userAuth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [User],
      migrations: ['src/migrations/*.ts'],
      synchronize: true,
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      extra: {
        ssl:
          process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      },
    }),
  ],
  controllers: [UserProfileController, AuthController],
  providers: [UserProfileService, PrismaService, JwtAuthGuard, AuthService],
})
export class AppModule {}
