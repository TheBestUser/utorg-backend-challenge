import { IsEthereumAddress, IsNumberString, IsOptional } from 'class-validator';

export class PostRateDto {
  @IsEthereumAddress()
  from: string;

  @IsEthereumAddress()
  to: string;

  @IsOptional()
  @IsNumberString()
  fromAmount?: string;

  @IsOptional()
  @IsNumberString()
  toAmount?: string;
}
