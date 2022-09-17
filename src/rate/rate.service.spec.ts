import { Test, TestingModule } from '@nestjs/testing';
import { RateService } from './rate.service';
import { PancakeSwapModule } from '../pancake-swap/pancake-swap.module';

describe('RateService', () => {
  let service: RateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PancakeSwapModule],
      providers: [RateService],
    }).compile();

    service = module.get<RateService>(RateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
