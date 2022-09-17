import { Test, TestingModule } from '@nestjs/testing';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { PancakeSwapModule } from '../pancake-swap/pancake-swap.module';

describe('RateController', () => {
  let controller: RateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PancakeSwapModule],
      controllers: [RateController],
      providers: [RateService],
    }).compile();

    controller = module.get<RateController>(RateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
