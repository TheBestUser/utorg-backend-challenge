import { Injectable } from '@nestjs/common';
import {
  PancakeswapAbi,
  PancakeswapAbi__factory,
} from '../../types/ethers-contracts';
import { ConfigService } from '@nestjs/config';
import { BigNumberish, ethers, utils } from 'ethers';
import { GetAmount } from './interfaces/getAmount.interface';
import { BSC_RPC_NODE_URL, PANCAKE_SWAP_ROUTER_ADDRESS } from './constants';

@Injectable()
export class PancakeSwapService {
  constructor(private readonly configService: ConfigService) {}

  async getAmountIn({ amount, from, to }: GetAmount): Promise<string> {
    const pancakeSwapRouter = this.getPancakeSwapRouter();

    const res = await pancakeSwapRouter.getAmountIn(
      PancakeSwapService.prepareAmount(amount),
      from,
      to,
    );
    return utils.formatUnits(res, 6);
  }

  async getAmountOut({ amount, from, to }: GetAmount) {
    const pancakeSwapRouter = this.getPancakeSwapRouter();

    const res = await pancakeSwapRouter.getAmountOut(
      PancakeSwapService.prepareAmount(amount),
      from,
      to,
    );
    return utils.formatUnits(res, 6);
  }

  private getPancakeSwapRouter(): PancakeswapAbi {
    const rpcHost = this.configService.getOrThrow<string>(BSC_RPC_NODE_URL);
    const pancakeSwapRouterAddress = this.configService.getOrThrow<string>(
      PANCAKE_SWAP_ROUTER_ADDRESS,
    );
    const provider = new ethers.providers.JsonRpcProvider(rpcHost);

    return PancakeswapAbi__factory.connect(pancakeSwapRouterAddress, provider);
  }

  private static prepareAmount(amount: string): BigNumberish {
    return utils.parseUnits(amount, 6);
  }
}
