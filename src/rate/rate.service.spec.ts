import { Test, TestingModule } from '@nestjs/testing';
import { RateService } from './rate.service';
import { PancakeSwapService } from '../pancake-swap';
import { TradeRate } from '../shared';
import { PostRateDto } from './dto';
import { BadRequestException } from '@nestjs/common';

describe('RateService', () => {
  let module: TestingModule;
  let rateService: RateService, pancakeService: PancakeSwapService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        RateService,
        {
          provide: PancakeSwapService,
          useFactory: () => ({
            getAmountsIn: jest.fn(),
            getAmountsOut: jest.fn(),
          }),
        },
      ],
    }).compile();

    rateService = module.get<RateService>(RateService);
    pancakeService = module.get<PancakeSwapService>(PancakeSwapService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(rateService).toBeDefined();
  });

  describe('postRate', () => {
    it('should throw params validation error', async () => {
      const reqParams: PostRateDto = {} as PostRateDto;
      expect(() => rateService.postRate(reqParams)).toThrowError(
        BadRequestException,
      );
    });

    it('should make getAmountsIn request', async () => {
      const reqParams: PostRateDto = {
        fromAmount: '1.0',
      } as PostRateDto;

      const result: TradeRate = {
        fromAmount: '1.0',
        toAmount: '2.0',
      };

      jest.spyOn(pancakeService, 'getAmountsOut').mockResolvedValue(result);

      expect(await rateService.postRate(reqParams)).toMatchInlineSnapshot(`
        Object {
          "fromAmount": "1.0",
          "toAmount": "2.0",
        }
      `);
      expect(pancakeService.getAmountsIn).toHaveBeenCalledTimes(0);
      expect(pancakeService.getAmountsOut).toHaveBeenCalledTimes(1);
    });

    it('should make getAmountsOut request', async () => {
      const reqParams: PostRateDto = {
        toAmount: '1.0',
      } as PostRateDto;

      const result: TradeRate = {
        fromAmount: '1.0',
        toAmount: '2.0',
      };

      jest.spyOn(pancakeService, 'getAmountsIn').mockResolvedValue(result);

      expect(await rateService.postRate(reqParams)).toMatchInlineSnapshot(`
        Object {
          "fromAmount": "1.0",
          "toAmount": "2.0",
        }
      `);
      expect(pancakeService.getAmountsIn).toHaveBeenCalledTimes(1);
      expect(pancakeService.getAmountsOut).toHaveBeenCalledTimes(0);
    });
  });

  afterAll(async () => {
    await module?.close();
  });
});
