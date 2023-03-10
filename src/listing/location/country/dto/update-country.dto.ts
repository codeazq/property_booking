import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryInputDto } from './create-country.dto';

export class UpdateCountryInputDto extends PartialType(CreateCountryInputDto) {}

export class UpdateCountryOutputDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
