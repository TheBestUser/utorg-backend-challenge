import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { PancakeSwapModule } from '../pancake-swap';

@Module({
  imports: [PancakeSwapModule],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
