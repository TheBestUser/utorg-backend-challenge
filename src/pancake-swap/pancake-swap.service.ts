import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  PancakeRouterAbi,
  PancakeRouterAbi__factory,
} from '../../types/ethers-contracts';
import { ConfigService } from '@nestjs/config';
import { BigNumber, ethers, utils } from 'ethers';
import { GetAmount } from './interfaces';
import { PANCAKE_SWAP_ROUTER_ADDRESS } from './pancake-swap.constant';
import { TradeRate } from '../shared';

@Injectable()
export class PancakeSwapService {
  private readonly pancakeRouterAbi: PancakeRouterAbi;

  constructor(configService: ConfigService) {
    const rpcHost = configService.getOrThrow<string>('BSC_RPC_NODE_URL');
    const provider = new ethers.providers.JsonRpcProvider(rpcHost);

    this.pancakeRouterAbi = PancakeRouterAbi__factory.connect(
      PANCAKE_SWAP_ROUTER_ADDRESS,
      provider,
    );
  }

  async getAmountsIn({ amount, from, to }: GetAmount): Promise<TradeRate> {
    const resultAmounts = await this.pancakeRouterAbi
      .getAmountsIn(utils.parseEther(amount), [from, to])
      .catch(() => []);

    return this.getEtherBounds(resultAmounts);
  }

  async getAmountsOut({ amount, from, to }: GetAmount): Promise<TradeRate> {
    const resultAmounts = await this.pancakeRouterAbi
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
