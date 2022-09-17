import { Module } from '@nestjs/common';
import { PancakeSwapService } from './pancake-swap.service';

@Module({
  providers: [PancakeSwapService],
})
export class PancakeSwapModule {}
