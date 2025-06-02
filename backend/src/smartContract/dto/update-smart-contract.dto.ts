import { PartialType } from '@nestjs/mapped-types';
import { CreateSmartContractDto } from './create-smart-contract.dto';

export class UpdateSmartContractDto extends PartialType(CreateSmartContractDto) {}
