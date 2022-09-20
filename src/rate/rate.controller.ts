import { Body, Controller, Post } from '@nestjs/common';
import { RateService } from './rate.service';
import { PostRateDto, TradeRateDto } from './dto';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  postRate(@Body() postRateBodyDto: PostRateDto): Promise<TradeRateDto> {
    return this.rateService.postRate(postRateBodyDto);
  }
}
