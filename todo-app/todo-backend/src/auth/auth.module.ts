import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthTokenStrategy } from './strategies/auth-token.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtModule, UsersModule, PassportModule],
  providers: [AuthService, AuthTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
