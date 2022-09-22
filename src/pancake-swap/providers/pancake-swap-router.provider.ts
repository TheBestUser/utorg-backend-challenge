import {
  PancakeRouterAbi,
  PancakeRouterAbi__factory,
} from '../../../types/ethers-contracts';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import {
  PANCAKE_SWAP_ROUTER_ADDRESS,
  PANCAKE_SWAP_ROUTER_PROVIDER,
} from '../pancake-swap.constant';
import { Provider } from '@nestjs/common';

export const PancakeSwapRouterProvider: Provider<PancakeRouterAbi> = {
  provide: PANCAKE_SWAP_ROUTER_PROVIDER,
  useFactory: (configService: ConfigService): PancakeRouterAbi => {
    const rpcHost = configService.getOrThrow<string>('BSC_RPC_NODE_URL');
    const provider = new ethers.providers.JsonRpcProvider(rpcHost);

    return PancakeRouterAbi__factory.connect(
      PANCAKE_SWAP_ROUTER_ADDRESS,
      provider,
    );
  },
  inject: [ConfigService],
};
