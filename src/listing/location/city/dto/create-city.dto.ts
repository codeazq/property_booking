import { IsNotEmpty } from 'class-validator';

export class CreateCityInputDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @IsNotEmpty({ message: 'state id is required' })
  stateId: bigint;
}

export class CreateCityOutputDto {
  id: bigint;
  name: string;
  stateId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
