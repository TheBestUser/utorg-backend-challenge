import { Injectable } from '@nestjs/common';
import {
  PancakeswapAbi,
  PancakeswapAbi__factory,
} from '../../types/ethers-contracts';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { GetAmount } from './interfaces/getAmount.interface';
import { BSC_RPC_NODE_URL, PANCAKE_SWAP_ROUTER_ADDRESS } from './constants';

@Injectable()
export class PancakeSwapService {
  private readonly pancakeSwapRouter: PancakeswapAbi;

  constructor(configService: ConfigService) {
    const rpcHost = configService.getOrThrow<string>(BSC_RPC_NODE_URL);
    const pancakeSwapRouterAddress = configService.getOrThrow<string>(
      PANCAKE_SWAP_ROUTER_ADDRESS,
    );
    const provider = new ethers.providers.JsonRpcProvider(rpcHost);

    this.pancakeSwapRouter = PancakeswapAbi__factory.connect(
      pancakeSwapRouterAddress,
      provider,
    );
  }

  getAmountIn({ amount, from, to }: GetAmount) {
    return this.pancakeSwapRouter.getAmountIn(amount, from, to);
  }

  getAmountOut({ amount, from, to }: GetAmount) {
    return this.pancakeSwapRouter.getAmountOut(amount, from, to);
  }
}
