import { UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateUserDTO } from 'src/user/dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServce: AuthService) {}

  @ApiTags('API')
  @ApiResponse({
    status: 201,
    type: CreateUserDTO,
  })
  @Post('register')
  async registerUsers(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authServce.registerUser(dto);
  }

  @ApiTags('API')
  @ApiResponse({
    status: 200,
    type: AuthUserResponse,
  })
  @Post('login')
  async loginUsers(@Body() dto: LoginUserDTO): Promise<AuthUserResponse> {
    return this.authServce.loginUser(dto);
  }
}
