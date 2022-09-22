import { Test, TestingModule } from '@nestjs/testing';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { PostRateDto, TradeRateDto } from './dto';

describe('RateController', () => {
  let module: TestingModule;
  let rateService: RateService;
  let rateController: RateController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [RateController],
      providers: [
        {
          provide: RateService,
          useFactory: () => ({
            postRate: jest.fn(),
          }),
        },
      ],
    }).compile();

    rateController = module.get<RateController>(RateController);
    rateService = module.get<RateService>(RateService);
  });

  it('should be defined', () => {
    expect(rateController).toBeDefined();
  });

  describe('postRate', () => {
    it('should return a value with  numbers precision is 6', async () => {
      const addressString = '0x55d398326f99059ff775485246999027b3197955';
      const reqParam: PostRateDto = { from: addressString, to: addressString };

      const result: TradeRateDto = {
        fromAmount: '1',
        toAmount: '2',
      };
      jest.spyOn(rateService, 'postRate').mockResolvedValue(result);

      expect(await rateController.postRate(reqParam)).toMatchInlineSnapshot(`
        TradeRateDto {
          "fromAmount": "1.000000",
          "toAmount": "2.000000",
        }
      `);
    });
  });

  afterAll(async () => {
    await module?.close();
  });
});
