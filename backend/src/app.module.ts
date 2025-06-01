import { Module } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './userAuth/entities/user.entity';


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
})
export class AppModule {}
