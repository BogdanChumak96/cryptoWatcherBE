import { Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  email: string;
}

export class UpdateUserDTO{
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;
}