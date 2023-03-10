import { Controller, Get, Post, Request, Body, HttpCode } from '@nestjs/common';
import { RegisterUserInputDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { IdentityService } from './identity.service';
import { StatusCodes } from 'http-status-codes';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('register')
  @HttpCode(StatusCodes.CREATED)
  register(@Body() registerUserInputDto: RegisterUserInputDto) {
    return this.identityService.register(registerUserInputDto);
  }

  @Post('login')
  @HttpCode(StatusCodes.OK)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.identityService.login(
      loginUserDto.email,
      loginUserDto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(StatusCodes.OK)
  profile(@Request() req) {
    return req.user;
  }
}
