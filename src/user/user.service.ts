/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { WatchList } from 'src/watchlist/models/watchlist.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
    ) { }

    async hashpassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, 10);
        } catch (e) {
            throw new Error(e)
        }
    }

    //methood for testing
    // async getAllUsers() {
    //     return await this.userRepository.findAll();
    // }

    async findUserByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({ where: { email } })
        } catch (e) {
            throw new Error(e)
        }
    }


    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            dto.password = await this.hashpassword(dto.password);
            const newUser = {
                firstname: dto.firstname,
                username: dto.username,
                email: dto.email,
                password: dto.password,
            };
            await this.userRepository.create(newUser);
            return dto;
        } catch (e) {
            throw new Error(e)
        }
    }
    async publicUser(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({
                where: { email },
                attributes: {
                    exclude: ["password"]
                },
                include: {
                    model: WatchList,
                    required: false
                }
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
        try {
            await this.userRepository.update(dto, { where: { email } })
            return dto
        } catch (e) {
            throw new Error(e)
        }
    }

    async deleteUser(email: string): Promise<boolean> {
        try {
            await this.userRepository.destroy({ where: { email } })
            return true
        } catch (e) {
            throw new Error(e)
        }
    }
}
