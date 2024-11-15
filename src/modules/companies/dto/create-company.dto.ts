import {
  IsString,
  IsOptional,
  IsEmail,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ minLength: 2, maxLength: 100 })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({ required: false, maxLength: 500 })
  @IsString()
  @IsOptional()
  @Length(0, 500)
  description?: string;

  @ApiProperty({ required: false })
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @IsOptional()
  website?: string;

  @ApiProperty({ required: false })
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @IsOptional()
  logo_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 100)
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  state?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  country?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Matches(/^[A-Z0-9-\s]{3,10}$/i, {
    message: 'Invalid postal code format',
  })
  postal_code?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Invalid phone number format',
  })
  phone?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: true })
  @IsString()
  @Matches(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    {
      message: 'Invalid UUID format',
    },
  )
  user_id: string;
}
