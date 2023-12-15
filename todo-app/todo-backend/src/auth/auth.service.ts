import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { hash, verify } from "argon2";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dtos/login.dto";
import { AuthTokenPayload } from "./types/auth-token-payload.types";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  public async register({ name, password }: RegisterDto) {
    const hashedPassword = await this.hashPassword(password);

    const existingUser = await this.usersService.findUser('name', name);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.usersService.createUser({
      name,
      password: hashedPassword,
    });

    return user;
  }

  private async hashPassword(password: string) {
    const hashedPassword = await hash(password);

    return hashedPassword;
  }

  public async login({ name, password }: LoginDto) {
    const user = await this.usersService.findUser('name', name);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isPasswordValid = await this.usersService.validateUserPassword({
      password,
      userId: user.user_id,
    })

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const authTokenPayload: AuthTokenPayload = {
      sub: user.user_id,
      user_name: user.user_name,
    };

    const authToken = await this.generateAuthToken(authTokenPayload);

    return authToken;
  }

  private async generateAuthToken(payload: AuthTokenPayload) {
    const authToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION')
    });

    return authToken;
  }
}
