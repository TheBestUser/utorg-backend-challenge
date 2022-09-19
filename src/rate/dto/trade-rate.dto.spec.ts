import { plainToInstance } from 'class-transformer';
import { TradeRateDto } from './trade-rate.dto';

describe('TradeRateDto', () => {
  test.each`
    name                   | fromAmount
    ${'should round up'}   | ${'1000.1234567'}
    ${'should round up'}   | ${'999.99999999'}
    ${'should round down'} | ${'0'}
    ${'should round down'} | ${'0.0'}
    ${'should round down'} | ${'1000.000000'}
    ${'should round down'} | ${'1000.1234560'}
  `('$name: $fromAmount', ({ fromAmount }) => {
    expect(
      plainToInstance(TradeRateDto, {
        fromAmount,
      }),
    ).toMatchSnapshot('fromAmount');
  });

  test.each(['0', '0.0', '1000.000000', '1000.1234567', '999.99999999'])(
    'should round down: %s',
    (toAmount) => {
      expect(
        plainToInstance(TradeRateDto, {
          toAmount,
        }),
      ).toMatchSnapshot('toAmount');
    },
  );

  it('real example', () => {
    expect(
      plainToInstance(TradeRateDto, {
        fromAmount: '1000.123456',
        toAmount: '3.66425283767606108',
      }),
    ).toMatchInlineSnapshot(`
      TradeRateDto {
        "fromAmount": "1000.123456",
        "toAmount": "3.664252",
      }
    `);
  });
});
