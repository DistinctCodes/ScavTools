import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartContract } from './entities/smart_contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmartContract])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class SmartContractModule {}
