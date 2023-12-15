import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  public async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    return {
      user,
    }
  }

  @Post("/login")
  public async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto);

    return {
      auth_token: token,
    };
  }
}
