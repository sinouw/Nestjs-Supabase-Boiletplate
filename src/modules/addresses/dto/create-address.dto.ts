import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AddressType {
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}

export class CreateAddressDto {
  @ApiProperty({ minLength: 3, maxLength: 100 })
  @IsString()
  @Length(3, 100)
  street: string;

  @ApiProperty({ minLength: 2, maxLength: 50 })
  @IsString()
  @Length(2, 50)
  city: string;

  @ApiProperty({ required: false, minLength: 2, maxLength: 50 })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  state?: string;

  @ApiProperty({ minLength: 2, maxLength: 50 })
  @IsString()
  @Length(2, 50)
  country: string;

  @ApiProperty({ description: 'Postal/ZIP code' })
  @IsString()
  @Matches(/^[A-Z0-9-\s]{3,10}$/i, {
    message: 'Invalid postal code format',
  })
  postal_code: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  is_default?: boolean;

  @ApiProperty({ enum: AddressType, default: AddressType.HOME })
  @IsEnum(AddressType)
  @IsOptional()
  type?: AddressType;
}
