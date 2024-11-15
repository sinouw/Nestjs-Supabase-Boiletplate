import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Length,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInterestDto {
  @ApiProperty({ minLength: 2, maxLength: 50 })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({ minLength: 2, maxLength: 50 })
  @IsString()
  @Length(2, 50)
  label: string;

  @ApiProperty({ required: false, maxLength: 500 })
  @IsString()
  @IsOptional()
  @Length(0, 500)
  description?: string;

  @ApiProperty({ required: false, minimum: 0, maximum: 999 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(999)
  sort_order?: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
