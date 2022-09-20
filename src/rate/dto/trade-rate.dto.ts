import { IsNumberString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ceilEthers, floorEthers } from '../../shared';
import { DEFAULT_PRECISION } from '../rate.constant';

export class TradeRateDto {
  @Type(() => String)
  @Transform(({ value }) => ceilEthers(value, DEFAULT_PRECISION))
  @IsNumberString()
  fromAmount: string;

  @Type(() => String)
  @Transform(({ value }) => floorEthers(value, DEFAULT_PRECISION))
  @IsNumberString()
  toAmount: string;
}
