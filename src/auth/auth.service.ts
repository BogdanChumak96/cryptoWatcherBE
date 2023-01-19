import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/constants/errors';
import { CreateUserDTO } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) { }

  async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);
      return await this.userService.createUser(dto);
    } catch (e) {
      throw new Error(e)
    }
  }

  async loginUser(dto: LoginUserDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) throw new BadRequestException(AppError.USER_EXIST);
      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!validatePassword)
        throw new BadRequestException(AppError.USER_DATA_ERROR);
      const user = await this.userService.publicUser(dto.email);
      const token = await this.tokenService.jenerateJwtToken(user);
      return {
        user,
        token,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
