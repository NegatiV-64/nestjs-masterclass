import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  @Post('/register')
  public async register(@Body() dto: RegisterDto) {
    return {
      message: 'register',
      data: dto,
    };
  }

  @Post('/login')
  public async login() {
    return {
      message: 'login',
    };
  }
}
