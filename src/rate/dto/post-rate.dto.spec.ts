import { plainToInstance } from 'class-transformer';
import { PostRateDto } from './post-rate.dto';
import { Validator } from 'class-validator';

const validator = new Validator();

describe('PostRateDto', () => {
  const addressString = '0x55d398326f99059ff775485246999027b3197955';
  const incorrectAddressString = 'not_address_string';

  it('should throw error', () => {
    return validator
      .validate(
        plainToInstance(PostRateDto, {
          from: addressString,
          to: incorrectAddressString,
          fromAmount: '1000.000000.00',
        }),
      )
      .then((errors) => {
        expect(errors.length).toEqual(2);
      });
  });

  it('should return shorter string', () => {
    return validator
      .validate(
        plainToInstance(PostRateDto, {
          from: addressString,
          to: addressString,
          fromAmount: '1000.123456789',
        }),
      )
      .then((errors) => {
        expect(errors.length).toEqual(0);
      });
  });
});
