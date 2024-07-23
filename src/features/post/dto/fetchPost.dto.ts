// post.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min, Max, validateSync } from 'class-validator';

export class FetchPostDto {
    

    @ApiPropertyOptional({
      default: 1,
    })
    @IsOptional()
    readonly page?: number;

    @ApiPropertyOptional({
      default: 10,
    })
    @IsOptional()
    readonly pageSize?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    search?: string;

  
    }
