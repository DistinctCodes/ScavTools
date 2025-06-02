import { StarknetAddressValidator } from './starknet-address.validator';

describe('StarknetAddressValidator', () => {
  let validator: StarknetAddressValidator;

  beforeEach(() => {
    validator = new StarknetAddressValidator();
  });

  it('should return true for a valid StarkNet address', () => {
    const validAddress = '0x0' + 'a'.repeat(63);
    expect(validator.validate(validAddress)).toBe(true);
  });

  it('should return false for an address with invalid length', () => {
    const shortAddress = '0x0' + 'a'.repeat(10);
    expect(validator.validate(shortAddress)).toBe(false);

    const longAddress = '0x0' + 'a'.repeat(100);
    expect(validator.validate(longAddress)).toBe(false);
  });

  it('should return false for an address with invalid characters', () => {
    const invalidCharAddress = '0x0' + 'g'.repeat(63);
    expect(validator.validate(invalidCharAddress)).toBe(false);
  });

  it('should return false for an empty address', () => {
    expect(validator.validate('')).toBe(false);
    expect(validator.validate(null as any)).toBe(false);
    expect(validator.validate(undefined as any)).toBe(false);
  });
});