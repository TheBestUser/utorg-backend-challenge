import { Body, Controller, Post } from '@nestjs/common';
import { RateService } from './rate.service';
import { PostRateDto, TradeRateDto } from './dto';
import { TransformPlainToInstance } from 'class-transformer';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  @TransformPlainToInstance(TradeRateDto)
  postRate(@Body() postRateBodyDto: PostRateDto): Promise<TradeRateDto> {
    return this.rateService.postRate(postRateBodyDto);
  }
}
