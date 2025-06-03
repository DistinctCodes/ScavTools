import { customAlphabet } from 'nanoid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortIdGenerator {
  private readonly generator = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    8
  );

  generate(): string {
    return this.generator();
  }
}