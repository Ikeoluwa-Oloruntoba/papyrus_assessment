import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, validateSync } from 'class-validator';

export class FetchUsersDto {
  
  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;


  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100) // Set maximum page size as needed
  readonly pageSize?: number;


  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly search?: string;


  
}