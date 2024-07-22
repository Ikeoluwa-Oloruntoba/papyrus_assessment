import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { FetchUsersDto } from './dto/fetchusers.dto';
import { UserRepository } from 'src/drizzle-repositories/user.repository';

@Injectable()
export class UserService {

    constructor(private readonly userRepository: UserRepository) {}

    async create(data: CreateUserDto) {

        await this.checkIfUserExist(data.email)

        return await this.userRepository.createUser(data);
    }

    private async checkIfUserExist(email: string){

        const user = await this.userRepository.findUserByAny(email)

        if(user){
            throw new BadRequestException('Email Already Exist')
        }
    }
}
