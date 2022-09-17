import { Injectable } from '@nestjs/common';
import { PostRateBodyDto } from './dto/postRateBody.dto';
import { PancakeSwapService } from '../pancake-swap/pancake-swap.service';

@Injectable()
export class RateService {
  constructor(private readonly pancakeSwapService: PancakeSwapService) {}

  postRate(postRateBodyDto: PostRateBodyDto): Promise<unknown> {
    if (postRateBodyDto.fromAmount != null) {
      return this.pancakeSwapService.getAmountsOut({
        amount: postRateBodyDto.fromAmount,
        from: postRateBodyDto.from,
        to: postRateBodyDto.to,
      });
    }

    if (postRateBodyDto.toAmount != null) {
      return this.pancakeSwapService.getAmountsIn({
        amount: postRateBodyDto.toAmount,
        from: postRateBodyDto.from,
        to: postRateBodyDto.to,
      });
    }

    throw new Error('fromAmount or toAmount must be defined');
  }
}
