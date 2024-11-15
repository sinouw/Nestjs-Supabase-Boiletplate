import { IsString, IsOptional, IsBoolean, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessionDto {
  @ApiProperty({ minLength: 2, maxLength: 50 })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({ required: false, maxLength: 500 })
  @IsString()
  @IsOptional()
  @Length(0, 500)
  description?: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
