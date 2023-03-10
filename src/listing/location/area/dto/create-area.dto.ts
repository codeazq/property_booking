import { IsNotEmpty } from 'class-validator';
export class CreateAreaInputDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @IsNotEmpty({ message: 'city id is required' })
  cityId: bigint;
}

export class CreateAreaOutputDto {
  id: bigint;
  name: string;
  cityId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
