import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PANCAKE_SWAP_ROUTER_PROVIDER } from '../../src/pancake-swap/pancake-swap.constant';
import { utils } from 'ethers';

describe('RateController (e2e)', () => {
  const getAmountsIn = jest.fn();
  const getAmountsOut = jest.fn();
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PANCAKE_SWAP_ROUTER_PROVIDER)
      .useValue({
        getAmountsIn,
        getAmountsOut,
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/rate (GET)', () => {
    const [amountIn, amountOut] = ['1.0', '2.0'].map((v) =>
      utils.parseEther(v).toString(),
    );

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('resolves via getAmountsOut', async () => {
      getAmountsOut.mockResolvedValue([amountIn, amountOut]);

      await request(app.getHttpServer())
        .post('/rate')
        .send({
          from: '0x55d398326f99059ff775485246999027b3197955',
          to: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          fromAmount: '1.0',
        })
        .expect([200, 201])
        .expect({
          success: true,
          data: { fromAmount: '1.000000', toAmount: '2.000000' },
        });

      expect(getAmountsOut).toHaveBeenCalledTimes(1);
    });

    it('resolves via getAmountsIn', async () => {
      getAmountsIn.mockResolvedValue([amountIn, amountOut]);

      await request(app.getHttpServer())
        .post('/rate')
        .send({
          from: '0x55d398326f99059ff775485246999027b3197955',
          to: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          toAmount: '2.0',
        })
        .expect([200, 201])
        .expect({
          success: true,
          data: { fromAmount: '1.000000', toAmount: '2.000000' },
        });

      expect(getAmountsIn).toHaveBeenCalledTimes(1);
    });

    it('rejects', async () => {
      getAmountsOut.mockImplementation(async () => {
        throw new Error('some error');
      });

      await request(app.getHttpServer())
        .post('/rate')
        .send({
          from: '0x55d398326f99059ff775485246999027b3197955',
          to: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          fromAmount: '2.0',
        })
        .expect(500)
        .expect({
          success: false,
          error: 'Direct pair not found',
        });

      expect(getAmountsIn).toHaveBeenCalledTimes(0);
      expect(getAmountsOut).toHaveBeenCalledTimes(1);
    });

    it('validate params', () => {
      return request(app.getHttpServer())
        .post('/rate')
        .send({
          from: '0x55d398326f99059ff775485246999027b3197955',
          to: 'not_address_string',
          fromAmount: '2.0abcd',
        })
        .expect(400)
        .expect({
          success: false,
          error:
            'to must be an Ethereum address; fromAmount must be a number string',
        });
    });
  });

  afterAll(() => {
    app.close();
  });
});
