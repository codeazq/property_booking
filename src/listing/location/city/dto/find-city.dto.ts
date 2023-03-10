export class FindManyCityInputDto {
  name?: string;
  countryId?: number;
  stateId?: bigint;
}

export class FindCityOutputDto {
  id: bigint;
  name: string;
  stateId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
