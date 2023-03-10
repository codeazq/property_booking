import { IsNotEmpty } from 'class-validator';
export class CreateStateInputDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @IsNotEmpty({ message: 'country id is required' })
  countryId: number;
}

export class CreateStateOutputDto {
  id: bigint;
  name: string;
  countryId: number;
  createdAt: Date;
  updatedAt: Date;
}
