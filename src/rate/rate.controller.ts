import { Body, Controller, Post } from '@nestjs/common';
import { RateService } from './rate.service';
import { PostRateDto } from './dto';
import { ValidationPipe, TradeRateDto } from '../shared';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  postRate(
    @Body(new ValidationPipe({ transform: true }))
    postRateBodyDto: PostRateDto,
  ): Promise<TradeRateDto> {
    return this.rateService.postRate(postRateBodyDto);
  }
}
