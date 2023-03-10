import { PartialType } from '@nestjs/mapped-types';
import { CreateStateInputDto } from './create-state.dto';

export class UpdateStateInputDto extends PartialType(CreateStateInputDto) {}

export class UpdateStateOutputDto {
  id: bigint;
  name: string;
  countryId: number;
  createdAt: Date;
  updatedAt: Date;
}
