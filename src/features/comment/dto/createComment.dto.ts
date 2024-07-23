import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export class CreateCommentDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly postId: number;

 
}