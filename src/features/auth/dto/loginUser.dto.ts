import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, validateSync } from 'class-validator';

export class loginUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 20, { message: 'Password has to be between 3 and 20 chars' })
  password: string;

 
}
