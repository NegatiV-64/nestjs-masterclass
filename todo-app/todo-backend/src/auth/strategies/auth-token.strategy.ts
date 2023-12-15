import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthConfig } from "src/shared/config/auth.config";
import { AuthTokenPayload } from "../types/auth-token-payload.types";

@Injectable()
export class AuthTokenStrategy extends PassportStrategy(
  Strategy,
  AuthConfig.AuthTokenKey
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  public async validate({ sub, user_name }: AuthTokenPayload) {
    return {
      user_id: sub,
      user_name,
    };
  }
}
