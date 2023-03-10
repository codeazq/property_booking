export class FindManyStateInputDto {
  name?: string;
  countryId?: number;
}

export class FindStateOutputDto {
  id: bigint;
  name: string;
  countryId: number;
  createdAt: Date;
  updatedAt: Date;
}
