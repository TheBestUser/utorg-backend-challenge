import { Module } from '@nestjs/common';
import { PancakeSwapService } from './pancake-swap.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [PancakeSwapService],
  exports: [PancakeSwapService],
})
export class PancakeSwapModule {}
