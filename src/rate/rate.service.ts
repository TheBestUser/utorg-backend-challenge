import { Injectable } from '@nestjs/common';
import { PostRateBodyDto } from './dto/postRateBody.dto';
import { PancakeSwapService } from '../pancake-swap/pancake-swap.service';

@Injectable()
export class RateService {
  constructor(private readonly pancakeSwapService: PancakeSwapService) {}

  async postRate(postRateBodyDto: PostRateBodyDto): Promise<unknown> {
    if (postRateBodyDto.fromAmount != null) {
      const res = await this.pancakeSwapService.getAmountOut({
        amount: postRateBodyDto.fromAmount,
        from: postRateBodyDto.from,
        to: postRateBodyDto.to,
      });
      return res;
    }

    if (postRateBodyDto.toAmount != null) {
      const res = await this.pancakeSwapService.getAmountIn({
        amount: postRateBodyDto.toAmount,
        from: postRateBodyDto.from,
        to: postRateBodyDto.to,
      });
      return res;
    }

    throw new Error('fromAmount or toAmount must be defined');
  }
}
