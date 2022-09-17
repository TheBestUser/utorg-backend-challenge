import { Injectable } from '@nestjs/common';
import { PostRateBodyDto } from './dto/postRateBody.dto';
import { PancakeSwapService } from '../pancake-swap/pancake-swap.service';

@Injectable()
export class RateService {
  constructor(private readonly pancakeSwapService: PancakeSwapService) {}

  // TODO: сделать нормальное преобразование
  private static prepareAmount(amount: string): number {
    return parseInt(amount);
  }

  async postRate(postRateBodyDto: PostRateBodyDto): Promise<unknown> {
    if (postRateBodyDto.fromAmount != null) {
      const amount = RateService.prepareAmount(postRateBodyDto.fromAmount);
      const res = await this.pancakeSwapService.getAmountOut({
        amount,
        from: postRateBodyDto.from,
        to: postRateBodyDto.to,
      });
      return res.toNumber();
    }

    if (postRateBodyDto.toAmount != null) {
      const amount = RateService.prepareAmount(postRateBodyDto.toAmount);
      const res = await this.pancakeSwapService.getAmountIn({
        amount,
        from: postRateBodyDto.from,
        to: postRateBodyDto.to,
      });
      return res.toNumber();
    }

    throw new Error('fromAmount or toAmount must be defined');
  }
}
