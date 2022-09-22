import { Module } from '@nestjs/common';
import { PancakeSwapService } from './pancake-swap.service';
import { PancakeSwapRouterProvider } from './providers';

@Module({
  providers: [PancakeSwapRouterProvider, PancakeSwapService],
  exports: [PancakeSwapService],
})
export class PancakeSwapModule {}
