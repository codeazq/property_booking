import { PartialType } from '@nestjs/mapped-types';
import { CreateCityInputDto } from './create-city.dto';

export class UpdateCityInputDto extends PartialType(CreateCityInputDto) {}

export class UpdateCityOutputDto {
  id: bigint;
  name: string;
  stateId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
