import { Controller } from '@nestjs/common';
import { RateService } from 'src/rate/rate.service';

@Controller('rate')
export class RateController {
  constructor(private rateService: RateService) {}
}
