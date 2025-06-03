import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartContract } from './entities/smart_contract.entity';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';

@Module({
  imports: [TypeOrmModule.forFeature([SmartContract])],
  providers: [ShortenerService],
  controllers: [ShortenerController],
  exports: [TypeOrmModule],
})
export class SmartContractModule {}
