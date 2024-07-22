// post.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, validateSync } from 'class-validator';
import { CreatePostSchema } from '../post.schema';

export class CreatePostDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  constructor(data: Partial<CreatePostDto>) {
    Object.assign(this, data);
  }


  validate(): string | null {
    const result = CreatePostSchema.safeParse(this);
    if (!result.success) {
      return result.error.errors[0].message;
    }
    return null;
  }

}
