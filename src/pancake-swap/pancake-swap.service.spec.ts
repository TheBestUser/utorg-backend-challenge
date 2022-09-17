import { Test, TestingModule } from '@nestjs/testing';
import { PancakeSwapService } from './pancake-swap.service';

describe('PancakeSwapService', () => {
  let service: PancakeSwapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PancakeSwapService],
    }).compile();

    service = module.get<PancakeSwapService>(PancakeSwapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
