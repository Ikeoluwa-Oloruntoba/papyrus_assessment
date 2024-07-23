import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DtoValidator } from 'src/helpers/dtoValidator.helper';
import { CreateUserDto } from './dto/createUser.dto';
import { UserGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { FetchUsersDto } from './dto/fetchusers.dto';

@ApiTags('User')
@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a User' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() data: CreateUserDto) {

      // Create user
      const newUser = await this.userService.create(data);
  
      return {
        message: "User Created Successfully",
        data: newUser
      };
   
  }

}
