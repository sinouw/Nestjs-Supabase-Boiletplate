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

export class CreatePlanDto {
  @ApiProperty({ minLength: 2, maxLength: 50 })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({ required: false, maxLength: 500 })
  @IsString()
  @IsOptional()
  @Length(0, 500)
  description?: string;

  @ApiProperty({ minimum: 0, maximum: 999999.99 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999999.99)
  price: number;

  @ApiProperty({ required: false, minimum: 0, maximum: 365 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(365)
  trial_days?: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
