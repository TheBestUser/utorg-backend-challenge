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

  async getAmountsIn({ amount, from, to }: GetAmount) {
    const pancakeSwapRouter = this.getPancakeSwapRouter();
    const [fromAmount, toAmount] = await pancakeSwapRouter.getAmountsIn(
      prepareAmount(amount),
      [from, to],
    );

    return {
      fromAmount: wrapAmount(fromAmount),
      toAmount: wrapAmount(toAmount),
    };
  }

  async getAmountsOut({ amount, from, to }: GetAmount) {
    const pancakeSwapRouter = this.getPancakeSwapRouter();
    const [fromAmount, toAmount] = await pancakeSwapRouter.getAmountsOut(
      prepareAmount(amount),
      [from, to],
    );

    return {
      fromAmount: wrapAmount(fromAmount),
      toAmount: wrapAmount(toAmount),
    };
  }

  private getPancakeSwapRouter(): PancakeswapAbi {
    const rpcHost = this.configService.getOrThrow<string>(BSC_RPC_NODE_URL);
    const pancakeSwapRouterAddress = this.configService.getOrThrow<string>(
      PANCAKE_SWAP_ROUTER_ADDRESS,
    );
    const provider = new ethers.providers.JsonRpcProvider(rpcHost);

    return PancakeswapAbi__factory.connect(pancakeSwapRouterAddress, provider);
  }
}

function prepareAmount(amount: string): BigNumberish {
  return utils.parseUnits(amount, 6);
}

function wrapAmount(amount: BigNumberish): string {
  return utils.formatUnits(amount, 6);
}
