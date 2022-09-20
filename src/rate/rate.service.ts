import { BadRequestException, Injectable } from '@nestjs/common';
import { PostRateDto } from './dto';
import { PancakeSwapService } from '../pancake-swap';
import { TradeRate } from '../shared';

@Injectable()
export class RateService {
  constructor(private readonly pancakeSwapService: PancakeSwapService) {}

  postRate(postRateDto: PostRateDto): Promise<TradeRate> {
    if (postRateDto.fromAmount != null) {
      return this.pancakeSwapService.getAmountsOut({
        amount: postRateDto.fromAmount,
        from: postRateDto.from,
        to: postRateDto.to,
      });
    }

    if (postRateDto.toAmount != null) {
      return this.pancakeSwapService.getAmountsIn({
        amount: postRateDto.toAmount,
        from: postRateDto.from,
        to: postRateDto.to,
      });
    }

    throw new BadRequestException('fromAmount or toAmount must be defined');
  }
}
