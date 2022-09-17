import { BigNumberish } from '@ethersproject/bignumber';

// TODO: переделать на DTO и добавить валидаторов
export interface GetAmount {
  readonly from: string;
  readonly to: string;
  readonly amount: BigNumberish;
}
