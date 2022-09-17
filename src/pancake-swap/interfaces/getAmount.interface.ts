// TODO: переделать на DTO и добавить валидаторов
export interface GetAmount {
  readonly from: string;
  readonly to: string;
  readonly amount: string;
}
