export class FindManyAreaInputDto {
  name?: string;
  stateId?: number;
  cityId?: bigint;
}

export class FindAreaOutputDto {
  id: bigint;
  name: string;
  cityId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
