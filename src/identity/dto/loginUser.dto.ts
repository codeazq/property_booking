import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
