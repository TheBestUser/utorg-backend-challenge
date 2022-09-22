import { Test, TestingModule } from '@nestjs/testing';
import { PancakeSwapService } from './pancake-swap.service';
import { ConfigModule } from '@nestjs/config';
import { PANCAKE_SWAP_ROUTER_PROVIDER } from './pancake-swap.constant';
import { Provider } from '@nestjs/common';
import { GetAmount } from './interfaces';
import { utils } from 'ethers';

const getAmountsIn = jest.fn();
const getAmountsOut = jest.fn();
const PancakeSwapRouterProviderMock: Provider = {
  provide: PANCAKE_SWAP_ROUTER_PROVIDER,
  useValue: {
    getAmountsIn,
    getAmountsOut,
  },
};

describe('PancakeSwapService', () => {
  let module: TestingModule;
  let pancakeSwapService: PancakeSwapService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [PancakeSwapRouterProviderMock, PancakeSwapService],
    }).compile();

    pancakeSwapService = module.get<PancakeSwapService>(PancakeSwapService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(pancakeSwapService).toBeDefined();
  });

  describe('getAmountsIn', () => {
    const reqParam: GetAmount = {
      amount: '1.0',
    } as GetAmount;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a value', async () => {
      const [amountIn, amountOut] = ['1.0', '2.0'].map((v) =>
        utils.parseEther(v).toString(),
      );
      getAmountsIn.mockResolvedValue([amountIn, amountOut]);
      expect(await pancakeSwapService.getAmountsIn(reqParam))
        .toMatchInlineSnapshot(`
        Object {
          "fromAmount": "1.0",
          "toAmount": "2.0",
        }
      `);
      expect(getAmountsIn).toHaveBeenCalledTimes(1);
    });

    it(`should wrap the provider's error`, async () => {
      getAmountsIn.mockImplementation(async () => {
        throw new Error('some error');
      });

      await expect(
        pancakeSwapService.getAmountsIn(reqParam),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Direct pair not found"`);
    });

    it(`should throw an error`, async () => {
      getAmountsIn.mockResolvedValue(() => {
        return [];
      });

      await expect(
        pancakeSwapService.getAmountsIn(reqParam),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Direct pair not found"`);
    });
  });

  describe('getAmountsOut', () => {
    const reqParam: GetAmount = {
      amount: '2.0',
    } as GetAmount;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a value', async () => {
      const [amountIn, amountOut] = ['1.0', '2.0'].map((v) =>
        utils.parseEther(v).toString(),
      );
      getAmountsOut.mockResolvedValue([amountIn, amountOut]);
      expect(await pancakeSwapService.getAmountsOut(reqParam))
        .toMatchInlineSnapshot(`
        Object {
          "fromAmount": "1.0",
          "toAmount": "2.0",
        }
      `);
      expect(getAmountsOut).toHaveBeenCalledTimes(1);
    });

    it(`should wrap the provider's error`, async () => {
      getAmountsOut.mockImplementation(async () => {
        throw new Error('some error');
      });

      await expect(
        pancakeSwapService.getAmountsOut(reqParam),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Direct pair not found"`);
    });

    it(`should throw an error`, async () => {
      getAmountsOut.mockResolvedValue([]);

      await expect(
        pancakeSwapService.getAmountsOut(reqParam),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Direct pair not found"`);
    });
  });

  afterAll(() => {
    module?.close();
  });
});
