import { Get } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Body, Patch, Req, UseGuards, Controller } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getAllUsers() {
  //   return this.userService.getAllUsers();
  // }


  @ApiTags('API')
  @ApiResponse({
    status: 200,
    type: UpdateUserDTO,
  })

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() dto: UpdateUserDTO,
    @Req() request,
  ): Promise<UpdateUserDTO> {
    const user = request.user;
    return this.userService.updateUser(user.email, dto);
  }

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() req): Promise<boolean> {
    const { email } = req.user;
    return this.userService.deleteUser(email);
  }
}
