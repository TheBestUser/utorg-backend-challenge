import { IsEthereumAddress, IsNumberString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { floorEthers } from '../../shared';
import { DEFAULT_PRECISION } from '../rate.constant';

export class PostRateDto {
  @IsEthereumAddress()
  from: string;

  @IsEthereumAddress()
  to: string;

  @Transform(({ value }) => floorEthers(value, DEFAULT_PRECISION))
  @IsOptional()
  @IsNumberString()
  fromAmount?: string;

  @Transform(({ value }) => floorEthers(value, DEFAULT_PRECISION))
  @IsOptional()
  @IsNumberString()
  toAmount?: string;
}
