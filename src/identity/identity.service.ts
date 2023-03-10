import { Injectable, BadRequestException } from '@nestjs/common';
import {
  RegisterUserInputDto,
  RegisterUserOutputDto,
} from './dto/registerUser.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class IdentityService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findOneByEmail(email: string): Promise<any> {
    return await this.prismaService.user.findUnique({
      where: { email: email },
    });
  }

  private async create(
    createUserDto: RegisterUserInputDto,
  ): Promise<RegisterUserOutputDto> {
    await this.validateCreateUserInput(createUserDto);
    try {
      const user = await this.prismaService.user.create({
        data: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });
      return user;
    } catch (error) {}
  }

  private async validateCreateUserInput(createUserDto: RegisterUserInputDto) {
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('User email already taken');
    }
  }

  // async authenticate(email: string, pass) {
  //   const user = await this.findOneByEmail(email);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async login(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (user) {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        console.log('inside password matched');
        return this.signJwtToken(user);
      }
    } else {
      throw new BadRequestException('User not found');
    }
  }

  async register(registerUserInputDto: RegisterUserInputDto) {
    // create user
    try {
      const hashedPassword = await this.hashPassword(
        registerUserInputDto.password,
      );
      const user = await this.create({
        ...registerUserInputDto,
        ...{ password: hashedPassword },
      });

      console.log('inside register  method');

      return await this.login(
        registerUserInputDto.email,
        registerUserInputDto.password,
      );
    } catch (error) {
      throw error;
    }
  }

  private async signJwtToken(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
