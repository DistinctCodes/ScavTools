import { Injectable } from '@nestjs/common';

@Injectable()
export class StarknetAddressValidator {
  private readonly STARKNET_ADDRESS_REGEX = /^0x0[0-9a-fA-F]{63}$/;
  private readonly STARKNET_ADDRESS_LENGTH = 66;

  validate(address: string): boolean {
    if (!address) return false;
    if (address.length !== this.STARKNET_ADDRESS_LENGTH) return false;
    return this.STARKNET_ADDRESS_REGEX.test(address);
  }
}