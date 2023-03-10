import { IsEmail, IsNotEmpty } from 'class-validator';
export class RegisterUserInputDto {
  @IsNotEmpty({ message: 'first name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'last name is required' })
  lastName: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  password: string;
}

export class RegisterUserOutputDto {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
