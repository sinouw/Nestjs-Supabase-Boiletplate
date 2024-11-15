import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { SupabaseGuard } from '../../common/guards/supabase.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signout')
  @UseGuards(SupabaseGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged out',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async signOut(@Request() req) {
    return this.authService.signOut(req.user.token);
  }

  @Get('me')
  @UseGuards(SupabaseGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current user profile',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getProfile(@Request() req) {
    return this.authService.getUser(req.user.token);
  }
}
