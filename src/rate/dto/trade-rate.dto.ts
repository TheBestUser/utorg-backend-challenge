import { IsNumberString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ceilEthers, floorEthers } from '../../shared';

export class TradeRateDto {
  @Type(() => String)
  @Transform(({ value }) => ceilEthers(value, 6))
  @IsNumberString()
  fromAmount: string;

  @Type(() => String)
  @Transform(({ value }) => floorEthers(value, 6))
  @IsNumberString()
  toAmount: string;
}
