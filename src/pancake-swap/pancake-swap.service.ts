import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PancakeRouterAbi } from '../../types/ethers-contracts';
import { BigNumber, utils } from 'ethers';
import { GetAmount } from './interfaces';
import { TradeRate } from '../shared';
import { PANCAKE_SWAP_ROUTER_PROVIDER } from './pancake-swap.constant';

@Injectable()
export class PancakeSwapService {
  constructor(
    @Inject(PANCAKE_SWAP_ROUTER_PROVIDER)
    private readonly pancakeRouter: PancakeRouterAbi,
  ) {}

  async getAmountsIn({ amount, from, to }: GetAmount): Promise<TradeRate> {
    const resultAmounts = await this.pancakeRouter
      .getAmountsIn(utils.parseEther(amount), [from, to])
      .catch(() => []);

    return this.getEtherBounds(resultAmounts);
  }

  async getAmountsOut({ amount, from, to }: GetAmount): Promise<TradeRate> {
    const resultAmounts = await this.pancakeRouter
      .getAmountsOut(utils.parseEther(amount), [from, to])
      .catch(() => []);

    return this.getEtherBounds(resultAmounts);
  }

  private getEtherBounds(amounts: BigNumber[]): TradeRate {
    if (amounts.length < 2) {
      throw new InternalServerErrorException('Direct pair not found');
    }

    return {
      fromAmount: utils.formatEther(amounts[0]),
      toAmount: utils.formatEther(amounts[amounts.length - 1]),
    };
  }
}
