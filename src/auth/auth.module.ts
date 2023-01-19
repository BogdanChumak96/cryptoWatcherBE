import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';
import { JwtStrategy } from 'src/strategy';

@Module({
  imports: [UserModule, TokenModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
