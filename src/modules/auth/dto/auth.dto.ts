import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'yassine.elouni.dev@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'The password for the account. Must contain at least 6 characters, including uppercase, lowercase, number and special character',
    minimum: 6,
  })
  @IsString()
  @MinLength(6)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  password: string;
}

export class SignInDto {
  @ApiProperty({
    example: 'yassine.elouni.dev@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'The password for the account',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
