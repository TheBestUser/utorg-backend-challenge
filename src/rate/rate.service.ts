import { BadRequestException, Injectable } from '@nestjs/common';
import { PostRateDto } from './dto';
import { PancakeSwapService } from '../pancake-swap';
import { floorEthers, TradeRateDto } from '../shared';
import { TransformPlainToInstance } from 'class-transformer';

@Injectable()
export class RateService {
  constructor(private readonly pancakeSwapService: PancakeSwapService) {}

  @TransformPlainToInstance(TradeRateDto)
  postRate(postRateDto: PostRateDto): Promise<TradeRateDto> {
    if (postRateDto.fromAmount != null) {
      return this.pancakeSwapService.getAmountsOut({
        amount: floorEthers(postRateDto.fromAmount),
        from: postRateDto.from,
        to: postRateDto.to,
      });
    }

    if (postRateDto.toAmount != null) {
      return this.pancakeSwapService.getAmountsIn({
        amount: floorEthers(postRateDto.toAmount),
        from: postRateDto.from,
        to: postRateDto.to,
      });
    }

    throw new BadRequestException('fromAmount or toAmount must be defined');
  }
}
