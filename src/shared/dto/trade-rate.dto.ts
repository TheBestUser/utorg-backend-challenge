import { IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ceilEthers, floorEthers } from '../utils';
import { TradeRate } from '../interfaces';

export class TradeRateDto implements TradeRate {
  @IsNumberString()
  @Transform(({ value }) => ceilEthers(value, 6))
  fromAmount: string;

  @IsNumberString()
  @Transform(({ value }) => floorEthers(value, 6))
  toAmount: string;
}
