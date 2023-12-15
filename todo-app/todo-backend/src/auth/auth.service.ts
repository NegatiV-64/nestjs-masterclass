import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  public async register({ name, password }: RegisterDto) {
    
  }

  public async login() {
    return {
      message: 'login',
    };
  }
}
