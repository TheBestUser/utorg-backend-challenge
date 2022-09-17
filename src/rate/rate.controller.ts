import { Body, Controller, Post } from '@nestjs/common';
import { RateService } from './rate.service';
import { PostRateBodyDto } from './dto/postRateBody.dto';

@Controller('rate')
export class RateController {
  constructor(private rateService: RateService) {}

  @Post()
  postRate(@Body() postRateBodyDto: PostRateBodyDto) {
    return this.rateService.postRate(postRateBodyDto);
  }
}
