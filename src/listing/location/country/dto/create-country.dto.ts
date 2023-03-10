import { IsNotEmpty } from 'class-validator';

export class CreateCountryInputDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;
}

export class CreateCountryOutputDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
